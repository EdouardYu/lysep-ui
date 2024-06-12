import React, { useState, useEffect, ChangeEvent } from "react";
import axiosInstance from "@/services/axiosConfig";
import "./Modules.css";

interface Student {
  name: string;
}

interface Module {
  id: string;
  label: string;
}

const Modules: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axiosInstance.get<Module[]>("/modules");
        setModules(response.data);
      } catch (err) {
        setError("Failed to fetch modules");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const fetchStudents = async (moduleName: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<Student[]>(
        `/modules/${moduleName}/students`
      );
      setStudents(response.data);
    } catch (err) {
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleModuleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedModule(selected);
    fetchStudents(selected);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="modules-page">
      <h2 className="modules-title">Manage Modules</h2>
      <select onChange={handleModuleChange} value={selectedModule}>
        <option value="" disabled>
          Select a module
        </option>
        {modules.map((module, index) => (
          <option key={index} value={module}>
            {module}
          </option>
        ))}
      </select>
      {selectedModule && (
        <div className="students-list">
          <h3>Students in {selectedModule}</h3>
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} className="student-item">
                {student.name}
              </div>
            ))
          ) : (
            <p>No students enrolled in this module</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Modules;
