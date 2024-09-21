export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      overlay: {
        Row: {
          away_color: string | null
          away_name: string | null
          away_score: number | null
          away_sub_color: string | null
          away_text_color: string | null
          created_at: string
          extra_time: number | null
          home_color: string | null
          home_name: string | null
          home_score: number | null
          home_sub_color: string | null
          home_text_color: string | null
          id: number
          is_away_goal: boolean | null
          is_home_goal: boolean | null
          is_timer: boolean | null
          is_var: boolean | null
          special_bottom: string | null
          special_top: string | null
          standard_time: string | null
          time_type: string | null
        }
        Insert: {
          away_color?: string | null
          away_name?: string | null
          away_score?: number | null
          away_sub_color?: string | null
          away_text_color?: string | null
          created_at?: string
          extra_time?: number | null
          home_color?: string | null
          home_name?: string | null
          home_score?: number | null
          home_sub_color?: string | null
          home_text_color?: string | null
          id?: number
          is_away_goal?: boolean | null
          is_home_goal?: boolean | null
          is_timer?: boolean | null
          is_var?: boolean | null
          special_bottom?: string | null
          special_top?: string | null
          standard_time?: string | null
          time_type?: string | null
        }
        Update: {
          away_color?: string | null
          away_name?: string | null
          away_score?: number | null
          away_sub_color?: string | null
          away_text_color?: string | null
          created_at?: string
          extra_time?: number | null
          home_color?: string | null
          home_name?: string | null
          home_score?: number | null
          home_sub_color?: string | null
          home_text_color?: string | null
          id?: number
          is_away_goal?: boolean | null
          is_home_goal?: boolean | null
          is_timer?: boolean | null
          is_var?: boolean | null
          special_bottom?: string | null
          special_top?: string | null
          standard_time?: string | null
          time_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
