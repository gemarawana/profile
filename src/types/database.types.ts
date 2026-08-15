export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          key: string
          value: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_slides: {
        Row: {
          id: string
          label: string
          description: string
          image_url: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          description: string
          image_url: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          description?: string
          image_url?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      why_cards: {
        Row: {
          id: string
          title: string
          desc_text: string
          icon_name: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          desc_text: string
          icon_name: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          desc_text?: string
          icon_name?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      organization_divisions: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          id: string
          division_id: string | null
          name: string
          role: string
          batch: string
          image_url: string
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          division_id?: string | null
          name: string
          role: string
          batch: string
          image_url: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          division_id?: string | null
          name?: string
          role?: string
          batch?: string
          image_url?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_division_id_fkey"
            columns: ["division_id"]
            referencedRelation: "organization_divisions"
            referencedColumns: ["id"]
          }
        ]
      }
      activities: {
        Row: {
          id: string
          division_id: string | null
          title: string
          slug: string
          subtitle: string
          description: string | null
          image_url: string
          bento_span: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          division_id?: string | null
          title: string
          slug: string
          subtitle: string
          description?: string | null
          image_url: string
          bento_span?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          division_id?: string | null
          title?: string
          slug?: string
          subtitle?: string
          description?: string | null
          image_url?: string
          bento_span?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_division_id_fkey"
            columns: ["division_id"]
            referencedRelation: "organization_divisions"
            referencedColumns: ["id"]
          }
        ]
      }
      journey_steps: {
        Row: {
          id: string
          step_number: string
          title: string
          description: string
          image_url: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          step_number: string
          title: string
          description: string
          image_url: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          step_number?: string
          title?: string
          description?: string
          image_url?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          id: string
          image_url: string
          alt_text: string
          grid_class: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          image_url: string
          alt_text: string
          grid_class?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          alt_text?: string
          grid_class?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      member_stories: {
        Row: {
          id: string
          name: string
          batch: string
          quote: string
          full_story: string | null
          image_url: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          batch: string
          quote: string
          full_story?: string | null
          image_url: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          batch?: string
          quote?: string
          full_story?: string | null
          image_url?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          id: string
          division_id: string | null
          title: string
          slug: string
          excerpt: string
          content: string | null
          category: string
          author_name: string
          publication_date: string
          read_time: string
          image_url: string
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          division_id?: string | null
          title: string
          slug: string
          excerpt: string
          content?: string | null
          category: string
          author_name: string
          publication_date: string
          read_time: string
          image_url: string
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          division_id?: string | null
          title?: string
          slug?: string
          excerpt?: string
          content?: string | null
          category?: string
          author_name?: string
          publication_date?: string
          read_time?: string
          image_url?: string
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_division_id_fkey"
            columns: ["division_id"]
            referencedRelation: "organization_divisions"
            referencedColumns: ["id"]
          }
        ]
      }
      history_milestones: {
        Row: {
          id: string
          year: string
          event_description: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          year: string
          event_description: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          year?: string
          event_description?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string
          order_index?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      impact_statistics: {
        Row: {
          id: string
          stat_key: string
          stat_value: number
          stat_suffix: string
          label: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          stat_key: string
          stat_value: number
          stat_suffix?: string
          label: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stat_key?: string
          stat_value?: number
          stat_suffix?: string
          label?: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      },
      images: {
        Row: {
          id: string
          asset_key: string
          image_url: string
          alt_text: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          asset_key: string
          image_url: string
          alt_text?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          asset_key?: string
          image_url?: string
          alt_text?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
  }
}
