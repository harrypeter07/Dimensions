import InfiniteMenu, { ItemProps } from '@/components/InfiniteMenu';

const items: ItemProps[] = [
  {
    image: '/images/person/image-14.jpg',
    link: '/profile/john',
    title: 'John Anderson',
    description: 'Software Engineer with 5+ years of experience'
  },
  {
    image: '/images/person/image-15.jpg',
    link: '/profile/sarah',
    title: 'Sarah Johnson',
    description: 'UX Designer specializing in user research'
  },
  {
    image: '/images/person/image-17.jpg',
    link: '/profile/michael',
    title: 'Michael Chen',
    description: 'Full Stack Developer with React expertise'
  },
  {
    image: '/images/person/image-19.jpg',
    link: '/profile/emily',
    title: 'Emily Rodriguez',
    description: 'Product Manager with agile methodology focus'
  },
  {
    image: '/images/person/image-22.jpg',
    link: '/profile/david',
    title: 'David Kim',
    description: 'Data Scientist specializing in machine learning'
  },
  {
    image: '/images/person/image-24.jpg',
    link: '/profile/lisa',
    title: 'Lisa Wang',
    description: 'Frontend Developer with UI/UX background'
  },
  {
    image: '/images/person/image-27.jpg',
    link: '/profile/james',
    title: 'James Wilson',
    description: 'DevOps Engineer with cloud infrastructure experience'
  },
  {
    image: '/images/person/image-28.jpg',
    link: '/profile/olivia',
    title: 'Olivia Martinez',
    description: 'Mobile App Developer focusing on cross-platform solutions'
  },
  {
    image: '/images/person/image-30.jpg',
    link: '/profile/robert',
    title: 'Robert Taylor',
    description: 'Backend Developer specializing in API design'
  },
  {
    image: '/images/person/image-34.jpg',
    link: '/profile/sophia',
    title: 'Sophia Lee',
    description: 'Project Manager with technical background'
  },
  {
    image: '/images/person/image-35.jpg',
    link: '/profile/daniel',
    title: 'Daniel Brown',
    description: 'Security Specialist with focus on application security'
  },
  {
    image: '/images/person/image-37.jpg',
    link: '/profile/emma',
    title: 'Emma Davis',
    description: 'QA Engineer with automation testing expertise'
  },
  {
    image: '/images/person/image-39.jpg',
    link: '/profile/william',
    title: 'William Garcia',
    description: 'Systems Architect with enterprise solutions experience'
  },
  {
    image: '/images/person/image-42.jpg',
    link: '/profile/ava',
    title: 'Ava Thompson',
    description: 'Technical Writer with developer documentation focus'
  },
  {
    image: '/images/person/image-44.jpg',
    link: '/profile/nathan',
    title: 'Nathan Miller',
    description: 'Database Administrator with performance optimization skills'
  },
  {
    image: '/images/person/image-47.jpg',
    link: '/profile/isabella',
    title: 'Isabella Clark',
    description: 'UI Developer with expertise in accessible design'
  },
  {
    image: '/images/person/image-48.jpg',
    link: '/profile/ethan',
    title: 'Ethan Wright',
    description: 'Cloud Engineer specializing in serverless architecture'
  },
  {
    image: '/images/person/image-50.jpg',
    link: '/profile/mia',
    title: 'Mia Patel',
    description: 'Machine Learning Engineer with focus on NLP'
  },
  
];

const Component = () => {
  return (
    <div style={{ height: '100%', position: 'relative', width: '100%' }}>
      <InfiniteMenu items={items} />
    </div>
  );
};

export default Component;