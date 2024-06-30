(define-data-var balance uint 0)

(define-public (deposit (amount uint))
  (begin
    (var-set balance (+ (var-get balance) amount))
    (print { "event": "deposit", "amount": amount, "new-balance": (var-get balance) })
    (ok (var-get balance))
  )
)

(define-public (withdraw (amount uint))
  (begin
    (if (>= (var-get balance) amount)
      (begin
        (var-set balance (- (var-get balance) amount))
        (print { "event": "withdraw", "amount": amount, "new-balance": (var-get balance) })
        (ok (var-get balance))
      )
      (err "Insufficient balance")
    )
  )
)

(define-read-only (get-balance)
  (ok (var-get balance))
)
