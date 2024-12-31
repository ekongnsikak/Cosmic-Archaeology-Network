;; Peer Review Contract

(define-map reviews
  { review-id: uint }
  {
    project-id: uint,
    reviewer: principal,
    score: uint,
    comment: (string-utf8 1000),
    status: (string-ascii 20)
  }
)

(define-map project-reviews
  { project-id: uint }
  {
    review-ids: (list 100 uint),
    average-score: uint
  }
)

(define-data-var review-count uint u0)

(define-public (submit-review (project-id uint) (score uint) (comment (string-utf8 1000)))
  (let
    (
      (new-review-id (+ (var-get review-count) u1))
    )
    (asserts! (and (>= score u0) (<= score u100)) (err u400))
    (map-set reviews
      { review-id: new-review-id }
      {
        project-id: project-id,
        reviewer: tx-sender,
        score: score,
        comment: comment,
        status: "submitted"
      }
    )
    (var-set review-count new-review-id)
    (let
      (
        (project-review (default-to { review-ids: (list), average-score: u0 } (map-get? project-reviews { project-id: project-id })))
        (new-review-ids (unwrap! (as-max-len? (append (get review-ids project-review) new-review-id) u100) (err u406)))
        (new-average-score (/ (+ (* (get average-score project-review) (len (get review-ids project-review))) score) (len new-review-ids)))
      )
      (map-set project-reviews
        { project-id: project-id }
        {
          review-ids: new-review-ids,
          average-score: new-average-score
        }
      )
    )
    (ok new-review-id)
  )
)

(define-public (update-review-status (review-id uint) (new-status (string-ascii 20)))
  (let
    (
      (review (unwrap! (map-get? reviews { review-id: review-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get reviewer review)) (err u403))
    (ok (map-set reviews
      { review-id: review-id }
      (merge review { status: new-status })
    ))
  )
)

(define-read-only (get-review (review-id uint))
  (ok (map-get? reviews { review-id: review-id }))
)

(define-read-only (get-project-reviews (project-id uint))
  (ok (map-get? project-reviews { project-id: project-id }))
)

(define-read-only (get-review-count)
  (ok (var-get review-count))
)

