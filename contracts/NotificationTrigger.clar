(define-map notification-triggers
  ((contract-owner principal) (trigger-id uint))
  ((trigger-type (string-ascii 32)) (timestamp uint) (is-active bool)))

(define-data-var trigger-id-counter uint u1)

(define-public (create-trigger (trigger-type (string-ascii 32)))
  (let ((trigger-id (var-get trigger-id-counter)))
    (begin
      (map-insert notification-triggers
        ((contract-owner tx-sender) (trigger-id trigger-id))
        { trigger-type: trigger-type, timestamp: (block-height), is-active: true })
      (var-set trigger-id-counter (+ trigger-id u1))
      (ok trigger-id)
    )
  )
)

(define-public (deactivate-trigger (trigger-id uint))
  (let ((key (make-trigger-key tx-sender trigger-id)))
    (match (map-get notification-triggers key)
      trigger
      (begin
        (map-set notification-triggers key
          { trigger-type: (get trigger-type trigger), timestamp: (get timestamp trigger), is-active: false })
        (ok true)
      )
      (err u100) ;; Error: Trigger not found
    )
  )
)

(define-read-only (get-active-triggers)
  (ok (filter-active-triggers (map-values notification-triggers)))
)

;; Helper function to construct map keys
(define-private (make-trigger-key (owner principal) (id uint))
  {contract-owner: owner, trigger-id: id})

;; Helper function to filter active triggers
(define-private (filter-active-triggers (triggers (list 100 {trigger-type: (string-ascii 32), timestamp: uint, is-active: bool})))
  (filter
    (lambda (trigger)
      (is-eq (get is-active trigger) true))
    triggers)
)
