export default function TopicsPage() {
  return (
    <Container>
      <Card>
        <iframe
          src="/topic_viz.html"
          title="Topic Visualization"
          style={{ width: '1150px', height: '770px' }}
        />
      </Card>
      <Card>
        <iframe
          src="/count_macro_macro_per_month.html"
          title="Topic Visualization"
          style={{ width: '1150px', height: '770px' }}
        />
      </Card>
      <Card>
        <iframe
          src="/mean_macro_macro_per_month.html"
          title="Topic Visualization"
          style={{ width: '1150px', height: '770px' }}
        />
      </Card>
    </Container>
  )
}

function Card({ children }: any) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow mt-8">
      <div className="mt-4 px-4 py-2 sm:p-6 flex justify-center">
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
