import { RequestOptions } from 'http'

interface response<T> {
  statusCode: number
  statusMessage: string
  data: T
}

export const input: string

export interface outputItem {
  /**
   * This is a unique identifier for the item which allows help
   * Alfred to learn about this item for subsequent sorting and
   * ordering of the user's actioned results.
   */
  uid?: string

  /**
   * The title displayed in the result row. There are no options
   * for this element and it is essential that this element is populated.
   */
  title: string

  /**
   * The subtitle displayed in the result row. This element is optional.
   */
  subtitle?: string

  /**
   * The argument which is passed through the workflow to the connected
   * output action.
   */
  arg?: string

  /**
   * The icon displayed in the result row. Workflows are run from their
   * workflow folder, so you can reference icons stored in your workflow
   * relatively.
   */
  icon?: {
    type?: 'fileicon' | 'filetype'
    path: string
  }

  /**
   * If this item is valid or not.
   * If an item is valid then Alfred will action this item when the user
   * presses return.
   * If the item is not valid, Alfred will do nothing.
   */
  valid?: boolean

  /**
   * The match field enables you to define what Alfred matches against
   * when the workflow is set to "Alfred Filters Results".
   */
  match?: string

  /**
   * Provide which is populated into Alfred's search field if the user
   * auto-complete's the selected result (⇥ by default).
   */
  autocomplete?: string

  /**
   * By specifying "type": "file", this makes Alfred treat your result
   * as a file on your system. This allows the user to perform actions
   * on the file like they can with Alfred's standard file filters.
   * When returning files, Alfred will check if the file exists before
   * presenting that result to the user. This has a very small performance
   * implication but makes the results as predictable as possible.
   * If you would like Alfred to skip this check as you are certain that
   * the files you are returning exist, you can use "type": "file:skipcheck".
   */
  type?: 'default' | 'file' | 'file:skipcheck'

  mods?: {
    alt: {
      valid: boolean
      arg: string
      subtitle: string
    }
    cmd: {
      valid: boolean
      arg: string
      subtitle: string
    }
  }

  /**
   * The text element defines the text the user will get when copying the
   * selected result row with ⌘C or displaying large type with ⌘L.
   */
  text?: {
    copy?: string
    largetype?: string
  }

  /**
   * A Quick Look URL which will be visible if the user uses the Quick Look
   * feature within Alfred (tapping shift, or cmd+y). Note that quicklookurl
   * will also accept a file path, both absolute and relative to home using ~/.
   */

  quicklookurl?: string
}

export function output (items: outputItem[]): void

export function get (url: string, options?: RequestOptions): Promise<response<string>>
export function getCache (url: string, options?: RequestOptions): Promise<response<string>>

export function getJson<T> (url: string, options?: RequestOptions): Promise<response<T>>
export function getJsonCache<T> (url: string, options?: RequestOptions): Promise<response<T>>

export function download (targetPath: string, url: string, options?: RequestOptions): Promise<string>
export function downloadCache (targetPath: string, url: string, options?: RequestOptions): Promise<string>

interface fileFilterOption {
  includes?: string[]
  excludes?: string[]
  deep?: boolean
  hidden?: boolean
  folder?: boolean
  file?: boolean
}
export function fileFilter (scopes: string[], options?: fileFilterOption): string[]