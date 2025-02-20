export async function fetchCourses() {
    try {
        const response = await fetch("http://localhost:1337/api/courses?populate=*");
        const data = await response.json();
        if (data.data) {
            return { courses: data.data, error: null };
        } else {
            return { courses: [], error: "No courses found" };
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
        return { courses: [], error: "Error fetching courses" };
    }
}

export async function fetchCoursesByCategory(category) {
    try {
        const response = await fetch("http://localhost:1337/api/courses?populate=*");
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
            const filteredCourses = data.data.filter(course => course.category === category);
            return { courses: filteredCourses, error: filteredCourses.length ? null : `No courses found for '${category}'` };
        } else {
            return { courses: [], error: "Invalid data structure or no data found" };
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
        return { courses: [], error: "Error fetching courses" };
    }
}