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

(define-public (clear-event-log)
  (begin
    (var-set event-log [])
    (ok "Event log cleared")
  )
)

(define-read-only (filter-events-by-type (event-type (string-ascii 50)))
  (let ((events (var-get event-log)))
    (ok (filter (lambda (event) (is-eq (get event event) event-type)) events))
  )
)

(define-read-only (get-events-by-timestamp-range (start uint) (end uint))
  (let ((events (var-get event-log)))
    (ok (filter (lambda (event)
                  (and (>= (get timestamp event) start)
                       (<= (get timestamp event) end)))
                events))
  )
)

(define-public (update-event (id int) (new-event-type (string-ascii 50)))
  (let ((event (find-event id)))
    (if (is-some event)
      (let ((timestamp (get timestamp (unwrap! event (err "Event not found")))))
        (let ((updated-event {id: id, event: new-event-type, timestamp: timestamp}))
          (let ((filtered-events (filter (lambda (event) (not (is-eq (get id event) id))) (var-get event-log))))
            (var-set event-log (take 100 (cons updated-event filtered-events)))
            (ok "Event updated")
          )
        )
      )
      (err "Event not found")
    )
  )
)

(define-public (delete-event (id int))
  (let ((event (find-event id)))
    (if (is-some event)
      (begin
        (let ((filtered-events (filter (lambda (event) (not (is-eq (get id event) id))) (var-get event-log))))
          (var-set event-log filtered-events)
          (ok "Event deleted")
        )
      )
      (err "Event not found")
    )
  )
)

(define-private (log-event (id int) (event-type (string-ascii 50)))
  (let ((timestamp (block-height)))
    (let ((new-event {id: id, event: event-type, timestamp: timestamp}))
      (let ((new-log (cons new-event (var-get event-log))))
        (var-set event-log (take 100 new-log))
      )
    )
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