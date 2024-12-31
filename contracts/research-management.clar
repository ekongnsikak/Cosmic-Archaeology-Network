;; Research Management Contract

(define-map research-projects
  { project-id: uint }
  {
    title: (string-ascii 100),
    description: (string-utf8 1000),
    lead-researcher: principal,
    collaborators: (list 20 principal),
    status: (string-ascii 20),
    data-hash: (buff 32)
  }
)

(define-data-var project-count uint u0)

(define-public (create-project (title (string-ascii 100)) (description (string-utf8 1000)))
  (let
    (
      (new-project-id (+ (var-get project-count) u1))
    )
    (map-set research-projects
      { project-id: new-project-id }
      {
        title: title,
        description: description,
        lead-researcher: tx-sender,
        collaborators: (list tx-sender),
        status: "active",
        data-hash: 0x00
      }
    )
    (var-set project-count new-project-id)
    (ok new-project-id)
  )
)

(define-public (add-collaborator (project-id uint) (collaborator principal))
  (let
    (
      (project (unwrap! (map-get? research-projects { project-id: project-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get lead-researcher project)) (err u403))
    (ok (map-set research-projects
      { project-id: project-id }
      (merge project { collaborators: (unwrap! (as-max-len? (append (get collaborators project) collaborator) u20) (err u406)) })
    ))
  )
)

(define-public (update-project-status (project-id uint) (new-status (string-ascii 20)))
  (let
    (
      (project (unwrap! (map-get? research-projects { project-id: project-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get lead-researcher project)) (err u403))
    (ok (map-set research-projects
      { project-id: project-id }
      (merge project { status: new-status })
    ))
  )
)

(define-public (update-project-data (project-id uint) (data-hash (buff 32)))
  (let
    (
      (project (unwrap! (map-get? research-projects { project-id: project-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get lead-researcher project)) (err u403))
    (ok (map-set research-projects
      { project-id: project-id }
      (merge project { data-hash: data-hash })
    ))
  )
)

(define-read-only (get-project (project-id uint))
  (ok (map-get? research-projects { project-id: project-id }))
)

(define-read-only (get-project-count)
  (ok (var-get project-count))
)

