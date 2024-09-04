import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const URL = "http://localhost:5000/trainings"; // Updated endpoint

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(URL);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSearch = () => {
    const filteredCourses = courses.filter((course) =>
      Object.values(course).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setCourses(filteredCourses);
    setNoResults(filteredCourses.length === 0);
  };

  // Function to group courses by category
  const groupCoursesByCategory = () => {
    const categories = {
      technology: [],
      business: [],
      design: [],
      marketing: [],
      health: [],
      finance: [],
    };

    courses.forEach((course) => {
      if (categories[course.courseCategory]) {
        categories[course.courseCategory].push(course);
      }
    });

    return categories;
  };

  const categorizedCourses = groupCoursesByCategory();

  return (
    <div className="course-details">
      <div className="admin-topic-course">
        Admin<span className="admin-sub-topic-course"> Dash Board</span>
      </div>
      <div className="course-details-body">
        <div className="search-box">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="search-ipt"
            placeholder="Search Courses"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
        <div>
          <div className="admin-topic-course">
            Course<span className="admin-sub-topic-course"> Details</span>
          </div>
          <br />

          {noResults ? (
            <h1 className="course-topic">
              No results <span className="course-us">found</span>
            </h1>
          ) : (
            Object.entries(categorizedCourses).map(([category, categoryCourses]) => (
              <div key={category}>
                <h2 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <div className="card-set-course">
                  {categoryCourses.length > 0 ? (
                    categoryCourses.map((course) => (
                      <div key={course._id} className="card-course">
                        <p className="course-name">{course.name}</p>
                        <div className="details-card-course">
                          <p className="card-details">
                            <b>Duration:</b> {course.duration}
                          </p>
                          <p className="card-details">
                            <b>Start Date:</b> {course.startDate}
                          </p>
                          <p className="card-details">
                            <b>End Date:</b> {course.endDate}
                          </p>
                          <p className="card-details">
                            <b>Details:</b> {course.details}
                          </p>
                          <p className="card-details">
                            <b>Security:</b> {course.security}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No courses in this category</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
