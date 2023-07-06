export default function TopicsPage() {
  return (
    <Container>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Topic clusters
      </h2>
      <Card>
        <iframe
          src="/topic_viz.html"
          title="Topic Visualization"
          style={{ width: '1170px', height: '770px' }}
        />
      </Card>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Review count per macro topic per month
      </h2>
      <Card>
        <iframe
          src="/count_macro_macro_per_month.html"
          style={{ width: '1150px', height: '770px' }}
        />
      </Card>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">
        Rating mean per macro topic per month
      </h2>
      <Card>
        <iframe
          src="/mean_macro_macro_per_month.html"
          style={{ width: '1150px', height: '770px' }}
        />
      </Card>
    </Container>
  )
}

function Card({ children, title }: any) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow mt-4 mb-8">
      <div className="mt-4 px-4 py-2 sm:p-6 flex justify-center align-middle flex-col">
        {children}
      </div>
    </div>
  )
}

function Container({ children }: any) {
  return (
    <div className="mx-auto max-w-8xl sm:px-6 lg:px-8 py-8">{children}</div>
  )
}
