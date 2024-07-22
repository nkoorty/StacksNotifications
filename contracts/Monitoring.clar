(define-data-var contract-counter uint 0)

(define-map monitored-contracts {id: uint} {owner: principal, contract-address: principal, description: (string-ascii 200)})
(define-map subscribers {contract-id: uint, subscriber: principal} {email: (string-ascii 100)})

(define-public (register-contract (contract-address principal) (description (string-ascii 200)))
  (begin
    (var-set contract-counter (+ (var-get contract-counter) 1))
    (map-insert monitored-contracts {id: (var-get contract-counter)} {owner: tx-sender, contract-address: contract-address, description: description})
    (print { "event": "contract-registered", "contract-id": (var-get contract-counter), "owner": tx-sender })
    (ok (var-get contract-counter))
  )
)

(define-public (subscribe (contract-id uint) (email (string-ascii 100)))
  (let (
    (contract (map-get? monitored-contracts {id: contract-id}))
    (already-subscribed (map-get? subscribers {contract-id: contract-id, subscriber: tx-sender}))
  )
    (if (and (is-some contract) (is-none already-subscribed))
      (begin
        (map-insert subscribers {contract-id: contract-id, subscriber: tx-sender} {email: email})
        (print { "event": "subscribed", "contract-id": contract-id, "subscriber": tx-sender })
        (ok (var-get contract-counter))
      )
      (err "Subscription failed")
    )
  )
)

(define-public (unsubscribe (contract-id uint))
  (let (
    (contract (map-get? monitored-contracts {id: contract-id}))
    (subscribed (map-get? subscribers {contract-id: contract-id, subscriber: tx-sender}))
  )
    (if (and (is-some contract) (is-some subscribed))
      (begin
        (map-delete subscribers {contract-id: contract-id, subscriber: tx-sender})
        (print { "event": "unsubscribed", "contract-id": contract-id, "subscriber": tx-sender })
        (ok true)
      )
      (err "Unsubscription failed")
    )
  )
)

(define-read-only (get-contracts)
  (ok (map entries monitored-contracts))
)

(define-read-only (get-subscribers (contract-id uint))
  (let ((subscribers-list (map-filter (lambda (entry) (is-eq (get contract-id (get key entry)) contract-id)) subscribers)))
    (ok subscribers-list)
  )
)

(define-read-only (get-contract (contract-id uint))
  (match (map-get monitored-contracts {id: contract-id})
    contract (ok contract)
    (err "Contract not found")
  )
)
