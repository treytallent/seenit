export interface Review {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string | null
    rating: number | null
  }
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface Reviews {
  page: number
  results: Review[]
  total_pages: number
  total_results: number
}

// todo: is this identical to what i had before? I think so.
export interface ReviewWithRating extends Omit<Review, 'author_details'> {
  author_details: Omit<Review['author_details'], 'rating'> & {
    rating: NonNullable<Review['author_details']['rating']>
  }
}
