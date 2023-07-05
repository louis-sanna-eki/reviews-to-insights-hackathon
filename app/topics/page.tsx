export default function TopicsPage() {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <iframe
        src="/topic_viz.html"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[90vh]"
        title="Topic Visualization"
        style={{ width: '1200px' }}
      />
    </div>
  )
}
