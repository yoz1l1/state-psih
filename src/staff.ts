export type StaffMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  years: string;
  note: string;
  photo: string;
};

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop`;

export const staff: StaffMember[] = [
  {
    id: 1,
    name: 'Richard S. Blackmore, M.D.',
    role: 'Director & Chief Psychiatrist',
    department: 'Administration',
    years: '1958 – 1964',
    note: 'Founder of the institution. Known for nightly rounds that no orderly was permitted to witness.',
    photo: px(1043471),
  },
  {
    id: 2,
    name: 'Helena V. Cross, R.N.',
    role: 'Head Nurse',
    department: 'Ward A — Women',
    years: '1958 – 1963',
    note: 'Maintained the wards with exacting discipline. Resigned abruptly in the spring of 1963.',
    photo: px(5214958),
  },
  {
    id: 3,
    name: 'Thomas J. Reid',
    role: 'Senior Orderly',
    department: 'Ward B — Men',
    years: '1959 – 1962',
    note: 'Resigned after a single night shift. His car was found in the lot; he was never seen again.',
    photo: px(1681010),
  },
  {
    id: 4,
    name: 'Edmund R. Holloway, M.D.',
    role: 'Attending Physician',
    department: 'Medical Wing',
    years: '1958 – 1964',
    note: 'Treated physical ailments of patients and staff alike. Kept the most complete case files in the house.',
    photo: px(540720),
  },
  {
    id: 5,
    name: 'Mary T. Wilson, R.N.',
    role: 'Night Nurse',
    department: 'Ward B — Men',
    years: '1960 – 1962',
    note: 'Last seen entering the service elevator on the night of February 17, 1962. No further record.',
    photo: px(5215024),
  },
  {
    id: 6,
    name: 'Father August Pell',
    role: 'Chaplain',
    department: 'Chapel',
    years: '1958 – 1964',
    note: 'Conducted services in the asylum chapel. Ceased hearing confessions after the winter of 1961.',
    photo: px(8197517),
  },
  {
    id: 7,
    name: 'Victor A. Marsh',
    role: 'Chief Engineer',
    department: 'Maintenance',
    years: '1958 – 1964',
    note: 'Responsible for the boiler room and the service elevator he refused to speak about.',
    photo: px(3777943),
  },
  {
    id: 8,
    name: 'Iris M. Calloway',
    role: 'Records Clerk',
    department: 'Archive',
    years: '1959 – 1964',
    note: 'Custodian of patient files. Several pages from the 1959 ledger were found torn from their bindings.',
    photo: px(733872),
  },
  {
    id: 9,
    name: 'George F. Hadley',
    role: 'Head of Security',
    department: 'Perimeter',
    years: '1958 – 1964',
    note: 'Patrolled the fence line. Reported lights in the basement windows long after the boilers were cold.',
    photo: px(2182970),
  },
  {
    id: 10,
    name: 'Adelaide P. Vance',
    role: 'Occupational Therapist',
    department: 'Therapeutic Wing',
    years: '1961 – 1964',
    note: 'Led craft and garden sessions for patients. The garden plots she tended still grow nothing.',
    photo: px(1181686),
  },
];
