export interface PipedriveDealContract {
  id: number
  creator_user_id?: number | any
  user_id?: number | any
  person_id: number | any
  org_id?: number | any
  stage_id?: number
  title: string
  value: number
  currency?: string
  add_time?: Date
  update_time: Date
  stage_change_time?: Date
  active?: boolean
  deleted?: boolean
  status?: string
  probability?: any
  next_activity_date?: any
  next_activity_time?: any
  next_activity_id?: any
  last_activity_id?: any
  last_activity_date?: any
  lost_reason?: any
  visible_to?: string
  close_time?: Date
  pipeline_id?: number
  won_time?: Date
  first_won_time?: Date
  lost_time?: any
  products_count: number
  files_count?: number
  notes_count?: number
  followers_count?: number
  email_messages_count?: number
  activities_count?: number
  done_activities_count?: number
  undone_activities_count?: number
  participants_count?: number
  expected_close_date?: string
  last_incoming_mail_time?: any
  last_outgoing_mail_time?: any
  label?: any
  renewal_type?: string
  stage_order_nr?: number
  person_name?: string
  org_name: string
  next_activity_subject?: any
  next_activity_type?: any
  next_activity_duration?: any
  next_activity_note?: any
  formatted_value?: string
  weighted_value?: number
  formatted_weighted_value?: string
  weighted_value_currency?: string
  rotten_time?: any
  owner_name: string
  cc_email?: string
  org_hidden?: boolean
  person_hidden?: boolean
}
