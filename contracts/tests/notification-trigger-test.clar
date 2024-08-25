(begin
  ;; Test initial event id counter value
  (asserts!
    (is-eq (var-get event-id-counter) u1)
    (err 0)
  )

  ;; Test creating a custom event
  (asserts!
    (is-ok (create-event "custom-trigger" tx-sender))
    (err 0)
  )

  ;; Test event retrieval by sender
  (asserts!
    (is-eq
      (get-events-by-sender tx-sender)
      [{ event-type: "custom-trigger", timestamp: u2, sender: tx-sender }]
    )
    (err 0)
  )
)
