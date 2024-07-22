(define-data-var balance uint 0)
(define-data-var transaction-log (list 100 {amount: uint, event: (string-ascii 10)}) [])

(define-map subscriptions { address: principal } { deposit-notify: bool, withdraw-notify: bool })

(define-public (subscribe (deposit-notify bool) (withdraw-notify bool))
  (begin
    (map-insert subscriptions { address: tx-sender } { deposit-notify: deposit-notify, withdraw-notify: withdraw-notify })
    (ok { "message": "Subscription updated" })
  )
)

(define-public (deposit (amount uint))
  (begin
    (var-set balance (+ (var-get balance) amount))
    (log-transaction amount "deposit")
    (notify-subscribers amount "deposit")
    (ok (var-get balance))
  )
)

(define-public (withdraw (amount uint))
  (begin
    (if (>= (var-get balance) amount)
      (begin
        (var-set balance (- (var-get balance) amount))
        (log-transaction amount "withdraw")
        (notify-subscribers amount "withdraw")
        (ok (var-get balance))
      )
      (err "Insufficient balance")
    )
  )
)

(define-read-only (get-balance)
  (ok (var-get balance))
)

(define-read-only (get-transaction-log)
  (ok (var-get transaction-log))
)

(define-read-only (get-subscription (address principal))
  (match (map-get? subscriptions { address: address })
    entry (ok entry)
    (err "No subscription found")
  )
)

(define-private (log-transaction (amount uint) (event (string-ascii 10)))
  (begin
    (let ((new-log (cons {amount: amount, event: event} (var-get transaction-log))))
      (var-set transaction-log (take 100 new-log))
    )
  )
)

(define-private (notify-subscribers (amount uint) (event (string-ascii 10)))
  (let ((subs (unwrap! (map-get? subscriptions { address: tx-sender }) { deposit-notify: false, withdraw-notify: false })))
    (if (or (and (is-eq event "deposit") (get deposit-notify subs))
            (and (is-eq event "withdraw") (get withdraw-notify subs)))
      (print { "event": event, "amount": amount, "new-balance": (var-get balance) })
      (ok true)
    )
  )
)
