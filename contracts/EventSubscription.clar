;; Define a map for subscriptions
(define-map subscriptions 
  { user: principal, event-type: (string-ascii 50) } 
  { subscribed: bool, email: (string-ascii 100), expires-at: uint }
)

;; Define a constant for subscription duration (e.g., 30 days)
(define-constant SUBSCRIPTION_DURATION 30)

;; Subscribe to an event type
(define-public (subscribe (user principal) (event-type (string-ascii 50)) (email (string-ascii 100)))
  (begin
    (map-insert subscriptions 
      { user: user, event-type: event-type } 
      { subscribed: true, email: email, expires-at: (+ (block-height) SUBSCRIPTION_DURATION) }
    )
    (print { "event": "subscription", "user": user, "event-type": event-type, "email": email })
    (ok user)
  )
)

;; Unsubscribe from an event type
(define-public (unsubscribe (user principal) (event-type (string-ascii 50)))
  (begin
    (map-delete subscriptions { user: user, event-type: event-type })
    (print { "event": "unsubscription", "user": user, "event-type": event-type })
    (ok user)
  )
)

;; Check if a user is subscribed to an event type
(define-read-only (is-subscribed (user principal) (event-type (string-ascii 50)))
  (match (map-get subscriptions { user: user, event-type: event-type })
    subscription (ok (get subscribed subscription))
    (ok false)
  )
)

;; List all subscribers for a specific event type
(define-read-only (list-subscribers (event-type (string-ascii 50)))
  (let ((all-subscriptions (map-to (map-get subscriptions) 
                                   (lambda (entry) 
                                     (if (is-eq (get event-type entry) event-type) 
                                         (some entry) 
                                         none)))))
    (ok (filter is-some all-subscriptions))
  )
)

;; List all subscriptions for a user
(define-read-only (list-user-subscriptions (user principal))
  (let ((user-subscriptions (map-to (map-get subscriptions) 
                                    (lambda (entry) 
                                      (if (is-eq (get user entry) user) 
                                          (some entry) 
                                          none)))))
    (ok (filter is-some user-subscriptions))
  )
)

;; Renew a subscription
(define-public (renew-subscription (user principal) (event-type (string-ascii 50)))
  (match (map-get subscriptions { user: user, event-type: event-type })
    subscription 
    (begin
      (map-set subscriptions 
        { user: user, event-type: event-type }
        { subscribed: (get subscribed subscription), 
          email: (get email subscription), 
          expires-at: (+ (block-height) SUBSCRIPTION_DURATION) }
      )
      (print { "event": "renewal", "user": user, "event-type": event-type })
      (ok user)
    )
    (err "Subscription not found")
  )
)
