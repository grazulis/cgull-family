import { test, expect } from '@playwright/test'

// Happy path: load → pick a child → see their data → mark a notification read → reload → state persisted.
//
// This spec is the contract the app needs to satisfy. Required data-testid hooks:
//   child-picker            — control listing enrolled children
//   child-option            — one entry per child inside the picker (data-child-id attr)
//   data-view               — region showing the selected child's collected data
//   data-row                — one row per data record
//   notifications-list      — region listing notifications
//   notification-item       — one notification (data-read="true|false")
//   notification-mark-read  — control on an unread notification

test.beforeEach(async ({ context }) => {
  await context.clearCookies()
  await context.addInitScript(() => window.localStorage.clear())
})

test('parent can view their child\'s data and persist a read notification', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByTestId('child-picker')).toBeVisible()

  const firstChild = page.getByTestId('child-option').first()
  const childId = await firstChild.getAttribute('data-child-id')
  await firstChild.click()

  const dataView = page.getByTestId('data-view')
  await expect(dataView).toBeVisible()
  await expect(dataView.getByTestId('data-row').first()).toBeVisible()

  const unread = page
    .getByTestId('notification-item')
    .filter({ has: page.getByTestId('notification-mark-read') })
    .first()
  await expect(unread).toBeVisible()
  await unread.getByTestId('notification-mark-read').click()
  await expect(unread).toHaveAttribute('data-read', 'true')

  await page.reload()

  // Selected child should still be active after reload.
  await expect(page.getByTestId('data-view')).toBeVisible()
  if (childId) {
    await expect(page.locator(`[data-child-id="${childId}"][aria-selected="true"]`)).toBeVisible()
  }

  // Notification should still be marked read.
  await expect(page.getByTestId('notification-item').first()).toHaveAttribute('data-read', 'true')
})
