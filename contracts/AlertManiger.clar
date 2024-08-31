(define-data-var alert-recipients (map (tuple (contract-id principal)) (list 100 principal)) {})

(define-public (register-alert (contract-id principal) (recipient principal))
  (begin
    (map-insert alert-recipients ((contract-id contract-id)) (cons recipient (map-get? alert-recipients contract-id)))
    (ok "Alert registered successfully!")
  )
)

(define-public (trigger-alert (contract-id principal))
  (let ((recipients (map-get? alert-recipients contract-id)))
    (begin
      (if (is-some recipients)
        (print (unwrap! recipients (err "No recipients found.")))
        (err "No recipients found.")
      )
      (ok "Alert triggered successfully!")
    )
  )
)

(define-read-only (get-alert-recipients (contract-id principal))
  (ok (map-get? alert-recipients contract-id))
)
