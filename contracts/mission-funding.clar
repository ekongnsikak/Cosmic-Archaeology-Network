;; Mission Funding Contract

(define-fungible-token cosmic-token)

(define-map funding-campaigns
  { campaign-id: uint }
  {
    project-id: uint,
    goal: uint,
    raised: uint,
    status: (string-ascii 20),
    beneficiary: principal
  }
)

(define-data-var campaign-count uint u0)

(define-public (create-funding-campaign (project-id uint) (goal uint))
  (let
    (
      (new-campaign-id (+ (var-get campaign-count) u1))
    )
    (map-set funding-campaigns
      { campaign-id: new-campaign-id }
      {
        project-id: project-id,
        goal: goal,
        raised: u0,
        status: "active",
        beneficiary: tx-sender
      }
    )
    (var-set campaign-count new-campaign-id)
    (ok new-campaign-id)
  )
)

(define-public (fund-campaign (campaign-id uint) (amount uint))
  (let
    (
      (campaign (unwrap! (map-get? funding-campaigns { campaign-id: campaign-id }) (err u404)))
    )
    (asserts! (is-eq (get status campaign) "active") (err u403))
    (try! (ft-transfer? cosmic-token amount tx-sender (as-contract tx-sender)))
    (ok (map-set funding-campaigns
      { campaign-id: campaign-id }
      (merge campaign { raised: (+ (get raised campaign) amount) })
    ))
  )
)

(define-public (close-campaign (campaign-id uint))
  (let
    (
      (campaign (unwrap! (map-get? funding-campaigns { campaign-id: campaign-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get beneficiary campaign)) (err u403))
    (if (>= (get raised campaign) (get goal campaign))
      (begin
        (try! (as-contract (ft-transfer? cosmic-token (get raised campaign) tx-sender (get beneficiary campaign))))
        (ok (map-set funding-campaigns
          { campaign-id: campaign-id }
          (merge campaign { status: "successful" })
        ))
      )
      (begin
        (try! (as-contract (ft-transfer? cosmic-token (get raised campaign) tx-sender (get beneficiary campaign))))
        (ok (map-set funding-campaigns
          { campaign-id: campaign-id }
          (merge campaign { status: "failed" })
        ))
      )
    )
  )
)

(define-read-only (get-campaign (campaign-id uint))
  (ok (map-get? funding-campaigns { campaign-id: campaign-id }))
)

(define-read-only (get-campaign-count)
  (ok (var-get campaign-count))
)

