(define-map events
  ((contract-owner principal) (event-id uint))
  ((event-type (string-ascii 32)) (timestamp uint) (sender principal)))

(define-public (create-event (event-type (string-ascii 32)) (sender principal))
  (begin
    (map-insert events
      ((contract-owner tx-sender) (event-id (next-event-id)))
      ((event-type event-type) (timestamp (block-height)) (sender sender)))
    (ok "Event created successfully")
  )
)

(define-read-only (get-events-by-type (event-type (string-ascii 32)))
  (begin
    (filter
      (lambda (event)
        (is-eq (get event-type (snd event)) event-type))
      (map-values events))
  )
)

(define-read-only (get-events-by-sender (sender principal))
  (begin
    (filter
      (lambda (event)
        (is-eq (get sender (snd event)) sender))
      (map-values events))
  )
)

(define-read-only (get-events-by-type-and-sender (event-type (string-ascii 32)) (sender principal))
  (begin
    (filter
      (lambda (event)
        (and
          (is-eq (get event-type (snd event)) event-type)
          (is-eq (get sender (snd event)) sender)))
      (map-values events))
  )
)

(define-read-only (next-event-id)
  (let ((current-id (var-get event-id-counter)))
    (begin
      (var-set event-id-counter (+ current-id u1))
      current-id)
  )
)

(define-data-var event-id-counter uint u1)