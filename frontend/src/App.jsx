import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
  });

  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/students";



  // GET STUDENTS
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchStudents();
  }, []);




  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  // CREATE + UPDATE
const handleSubmit = async (e) => {
  e.preventDefault();

  // NAME VALIDATION
  const nameRegex = /^[A-Za-z ]+$/;

  if (!nameRegex.test(formData.name)) {
    alert("Name should contain only letters");
    return;
  }

  // AGE VALIDATION
  const age = Number(formData.age);

  if (age <= 0 || age >= 100) {
    alert("Age should be between 1 and 99");
    return;
  }

  const studentData = {
    ...formData,
    age: age,
  };

  try {
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, studentData);
      setEditingId(null);
    } else {
      await axios.post(API_URL, studentData);
    }

    setFormData({
      name: "",
      age: "",
      course: "",
    });

    fetchStudents();

  } catch (error) {
    console.log(error);
  }
};




  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };




  // EDIT
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      age: student.age,
      course: student.course,
    });

    setEditingId(student._id);
  };




  return (
    <div className="container">
      <h1>Student Record Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Enter course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>



      <div className="student-list">
        {students.map((student) => (
          <div className="student-card" key={student._id}>
            <h3>{student.name}</h3>

            <p>Age: {student.age}</p>

            <p>Course: {student.course}</p>

            <button onClick={() => handleEdit(student)}>
              Edit
            </button>

            <button onClick={() => handleDelete(student._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;