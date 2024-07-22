(define-data-var event-counter int 0)

(define-public (trigger-event)
  (begin
    (var-set event-counter (+ (var-get event-counter) 1))
    (print { "event": "triggered", "counter": (var-get event-counter) })
    (ok (var-get event-counter))
  )
)
