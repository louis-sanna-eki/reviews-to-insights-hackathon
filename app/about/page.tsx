const people = [
  {
    name: 'Louis Sanna',
    imageUrl:
      'https://media.licdn.com/dms/image/C4D03AQGZPOiTncN_-w/profile-displayphoto-shrink_400_400/0/1641829552598?e=1694044800&v=beta&t=59W7oIje9Q6iPv9QNpkmB0traF3QpN2A4vuIjY5pQyM'
  }
]

export default function AboutPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-m font-bold leading-6 text-gray-900">
          This app was created during the summer 2023 Ekimetrics hackathon by:
        </div>
        <ul
          role="list"
          className="divide-y divide-gray-100 mt-4 justify-left flex flex-col"
        >
          {people.map(person => (
            <li
              key={person.name}
              className="flex gap-x-4 py-5 items-center justify-center"
            >
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.imageUrl}
                alt=""
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
