(begin
  ;; Benchmark original create-trigger
  (let ((start-time (block-height)))
    (begin
      (create-trigger "test")
      (create-trigger "test")
      (create-trigger "test")
      (create-trigger "test")
      (create-trigger "test")
      (ok (- (block-height) start-time))
    )
  )
)

(begin
  ;; Benchmark refactored create-trigger
  (let ((start-time (block-height)))
    (begin
      (create-trigger "test-refactor")
      (create-trigger "test-refactor")
      (create-trigger "test-refactor")
      (create-trigger "test-refactor")
      (create-trigger "test-refactor")
      (ok (- (block-height) start-time))
    )
  )
)
