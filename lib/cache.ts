import { unstable_cache } from 'next/cache';
import { getAllCourses, getStats, getCourse } from '@/lib/actions/actions';

// Cache course list for 6 hours
export const getCachedCourses = unstable_cache(
  async () => {
    return await getAllCourses();
  },
  ['all-courses'],
  {
    revalidate: 21600, // 6 hours
    tags: ['courses'],
  }
);

// Cache stats for 24 hours
export const getCachedStats = unstable_cache(
  async () => {
    return await getStats();
  },
  ['site-stats'],
  {
    revalidate: 86400, // 24 hours
    tags: ['stats'],
  }
);

// Cache individual course data for 12 hours
export const getCachedCourse = unstable_cache(
  async (courseCode: string) => {
    return await getCourse(courseCode);
  },
  ['course-data'],
  {
    revalidate: 43200, // 12 hours
    tags: ['course'],
  }
);
