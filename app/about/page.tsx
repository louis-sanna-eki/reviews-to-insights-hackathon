const people = [
  {
    name: 'Ismail Benaija',
    imageUrl:
      'https://media.licdn.com/dms/image/C5603AQFiP2gkJJ_QRQ/profile-displayphoto-shrink_800_800/0/1603033257709?e=1694044800&v=beta&t=IbFnEEcv-9xYXuqvX4XvY_hC8ZYBaSjGN16jGxmCPss',
    role: `Data Scientist`,
    twitterUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/ismail-benaija-4927b71a1'
  },
  {
    name: 'Félicien Cantalloube',
    imageUrl:
      'https://media.licdn.com/dms/image/D4E03AQHg7suABr3cNQ/profile-displayphoto-shrink_800_800/0/1669112002668?e=1694044800&v=beta&t=sDkhgftB-3Km7N5nW8IliYYEl76jxnWoAFKo9gMI6XI',
    role: `Data Scientist`,
    twitterUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/f%C3%A9licien-cantalloube'
  },
  {
    name: 'Timothée BOHE',
    imageUrl:
      'https://media.licdn.com/dms/image/C4D03AQGxy0qimC9oqQ/profile-displayphoto-shrink_400_400/0/1639590909504?e=1694044800&v=beta&t=zda3juVcC9JfoxGujFaw1c-7R1YjkIgZmZBrG1KrlZ4',
    role: `Data Scientist`,
    twitterUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/timothee-bohe'
  },
  {
    name: 'Louis Sanna',
    imageUrl:
      'https://media.licdn.com/dms/image/C4D03AQGZPOiTncN_-w/profile-displayphoto-shrink_400_400/0/1641829552598?e=1694044800&v=beta&t=59W7oIje9Q6iPv9QNpkmB0traF3QpN2A4vuIjY5pQyM',
    role: `Developer`,
    twitterUrl: 'https://twitter.com/louis_sanna',
    linkedinUrl: 'https://www.linkedin.com/in/louis-sanna-0168363a/'
  }
]

export default function AboutPage() {
  return (
    <div className="py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our team
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We&apos;re a passionate team using data science to power sustainable
            business growth.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {people.map(person => (
            <li key={person.name}>
              <img
                className="mx-auto h-56 w-56 rounded-full"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              <ul role="list" className="mt-6 flex justify-center gap-x-6">
                {person.twitterUrl ? (
                  <li>
                    <a
                      href={person.twitterUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </li>
                ) : null}
                <li>
                  <a
                    href={person.linkedinUrl}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
