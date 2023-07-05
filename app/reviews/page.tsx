import { StarIcon } from '@heroicons/react/20/solid'
import { format } from 'date-fns'
import rawReviews from '../../data/processed/reviews.json'

interface RawReview {
  docs: string
  rating: string
  timestamp: string
}

const reviews = processRawReviews(rawReviews)

interface ReviewCount {
  rating: number
  count: number
}

interface FeaturedReview {
  id: number
  rating: number
  content: string
}

interface Reviews {
  average: number
  totalCount: number
  counts: ReviewCount[]
  featured: FeaturedReview[]
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewPage() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map(rating => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {reviews.totalCount} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviews.counts
                .sort((a, b) => b.rating - a.rating)
                .map(count => (
                  <div key={count.rating} className="flex items-center text-sm">
                    <dt className="flex flex-1 items-center">
                      <p className="w-3 font-medium text-gray-900">
                        {count.rating}
                        <span className="sr-only"> star reviews</span>
                      </p>
                      <div
                        aria-hidden="true"
                        className="ml-1 flex flex-1 items-center"
                      >
                        <StarIcon
                          className={classNames(
                            count.count > 0
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />

                        <div className="relative ml-3 flex-1">
                          <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                          {count.count > 0 ? (
                            <div
                              className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                              style={{
                                width: `calc(${count.count} / ${reviews.totalCount} * 100%)`
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </dt>
                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                      {Math.round((count.count / reviews.totalCount) * 100)}%
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.featured.map(review => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <div className="">
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map(rating => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? 'text-yellow-400'
                                : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto text-xs text-right tabular-nums text-gray-400">
                      {format(new Date('2022-02-07 21:47:00'), 'MM/dd/yyyy')}
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function processRawReviews(raws: RawReview[]) {
  let totalCount = raws.length
  let sum = 0
  let ratingCounts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }

  let featured = raws.slice(0, 100).map((review, index) => ({
    id: index + 1,
    rating: parseRating(review.rating),
    content: `<p>${review.docs}</p>`,
    timestamp: review.timestamp
  }))

  for (let review of raws) {
    const rating = parseRating(review.rating)
    sum += rating
    // @ts-ignore
    ratingCounts[rating] += 1
  }

  let average = sum / totalCount

  let counts = Object.keys(ratingCounts).map(rating => ({
    rating: parseRating(rating),
    // @ts-ignore
    count: ratingCounts[rating]
  }))

  return {
    average: Math.round(average * 10) / 10,
    totalCount,
    counts,
    featured
  }
}

function parseRating(ratingStr: string): number {
  // Parse rating to float and round to nearest integer
  let parsedRating = Math.round(parseFloat(ratingStr))

  // Check if parsedRating is within [1, 2, 3, 4, 5]
  if (parsedRating < 1) {
    return 1
  } else if (parsedRating > 5) {
    return 5
  } else {
    return parsedRating
  }
}
