(define-map events
  ((contract-owner principal) (event-id uint))
  ((event-type (string-ascii 32)) (timestamp uint) (sender principal)))

(define-data-var event-id-counter uint u1)

(define-public (create-event (event-type (string-ascii 32)) (sender principal))
  (begin
    (map-insert events
      ((contract-owner tx-sender) (event-id (next-event-id)))
      ((event-type event-type) (timestamp (block-height)) (sender sender)))
    (ok "Event created successfully")
  )
)

(define-read-only (next-event-id)
  (let ((current-id (var-get event-id-counter)))
    (begin
      (var-set event-id-counter (+ current-id u1))
      current-id)
  )
)

(begin
  ;; Test creating an event
  (asserts!
    (is-ok (create-event "transaction" tx-sender))
    (err 0)
  )

  ;; Test event counter increment
  (asserts!
    (is-eq (next-event-id) u2)
    (err 0)
  )

  ;; Test storing an event in the map
  (asserts!
    (is-some (map-get events ((contract-owner tx-sender) (event-id u1))))
    (err 0)
  )

  ;; Test fetching events by type
  (asserts!
    (is-eq
      (map-get events ((contract-owner tx-sender) (event-id u1)))
      (some { event-type: "transaction", timestamp: u1, sender: tx-sender })
    )
    (err 0)
  )
)
