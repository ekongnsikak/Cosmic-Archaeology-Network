;; Space Data Integration Contract

(define-map telescope-data
  { data-id: uint }
  {
    telescope-id: (string-ascii 50),
    timestamp: uint,
    data-hash: (buff 32),
    metadata: (string-utf8 1000)
  }
)

(define-map probe-data
  { data-id: uint }
  {
    probe-id: (string-ascii 50),
    timestamp: uint,
    data-hash: (buff 32),
    metadata: (string-utf8 1000)
  }
)

(define-data-var telescope-data-count uint u0)
(define-data-var probe-data-count uint u0)

(define-public (submit-telescope-data (telescope-id (string-ascii 50)) (data-hash (buff 32)) (metadata (string-utf8 1000)))
  (let
    (
      (new-data-id (+ (var-get telescope-data-count) u1))
    )
    (map-set telescope-data
      { data-id: new-data-id }
      {
        telescope-id: telescope-id,
        timestamp: block-height,
        data-hash: data-hash,
        metadata: metadata
      }
    )
    (var-set telescope-data-count new-data-id)
    (ok new-data-id)
  )
)

(define-public (submit-probe-data (probe-id (string-ascii 50)) (data-hash (buff 32)) (metadata (string-utf8 1000)))
  (let
    (
      (new-data-id (+ (var-get probe-data-count) u1))
    )
    (map-set probe-data
      { data-id: new-data-id }
      {
        probe-id: probe-id,
        timestamp: block-height,
        data-hash: data-hash,
        metadata: metadata
      }
    )
    (var-set probe-data-count new-data-id)
    (ok new-data-id)
  )
)

(define-read-only (get-telescope-data (data-id uint))
  (ok (map-get? telescope-data { data-id: data-id }))
)

(define-read-only (get-probe-data (data-id uint))
  (ok (map-get? probe-data { data-id: data-id }))
)

(define-read-only (get-telescope-data-count)
  (ok (var-get telescope-data-count))
)

(define-read-only (get-probe-data-count)
  (ok (var-get probe-data-count))
)

