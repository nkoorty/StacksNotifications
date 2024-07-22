(define-map subscriptions { user: principal } { subscribed: bool })

(define-public (subscribe (user principal))
  (begin
    (map-insert subscriptions { user: user } { subscribed: true })
    (print { "event": "subscription", "user": user })
    (ok user)
  )
)

(define-public (unsubscribe (user principal))
  (begin
    (map-delete subscriptions { user: user })
    (print { "event": "unsubscription", "user": user })
    (ok user)
  )
)

(define-read-only (is-subscribed (user principal))
  (match (map-get subscriptions { user: user })
    subscription (ok (get subscribed subscription))
    (ok false)
  )
)
