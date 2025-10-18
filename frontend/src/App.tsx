import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import useAuthStore from "./stores/authStore";
import { approveJoinRequest, createFamily, createTask, deleteTask, login, rejectJoinRequest, signup, updateTask } from "./api";
import type { apiAuthType } from "./types";
import Home from "./components/Home";
import useFamilyStore from "./stores/familyStore";
import JoinRequests from "./components/JoinRequests";
import useJoinRequestStore from "./stores/joinRequestStore";
import useTasksStore from "./stores/taskStore";
import TasksList from "./components/TasksList";
import EditTask from "./components/EditTask";

function App() {
  const { token, user, setAuth, clearAuth } = useAuthStore();
  const { families, fetchFamilies, addFamily } = useFamilyStore();
  const { requests, sendJoinRequest, clearStatus, fetchRequests } = useJoinRequestStore();
  const { tasks, fetchTasks, addTask, updateTasksFunction, removeTask } = useTasksStore();


  const [mode, setMode] = useState("login");
  const [darkMode, setDarkMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showJoinRequests, setShowJoinRequests] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    if (token) {
      fetchFamilies(token);
      fetchTasks(token);
      fetchRequests(token);
    }
  }, [token, fetchFamilies, fetchTasks, fetchRequests]);

  async function handleLogin(creds: apiAuthType) {
    try {
      const res = await login(creds);
      setSuccessMsg('');
      setAuth(res.token, res.user);
      setSuccessMsg("Your Account was logged in Successfully!")
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      } else {
        setErrorMsg('Something went wrong.');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      }
    }
  }

  async function handleSignup(creds: apiAuthType) {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      const res = await signup(creds);
      setAuth(res.token, res.user);
      setSuccessMsg("Your Account was created Successfully!")
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      } else {
        setErrorMsg('Something went wrong.');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      }
    }
  }

  async function handleFamilyCreate(familyData) {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      const n = await createFamily(token, { ...familyData, userId: user.id });
      addFamily(n.family);
      user.familyId = n.family.id;
      setAuth(token, user);
      setSuccessMsg("The Family Group was Created Successfully!")
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      } else {
        setErrorMsg('Something went wrong.');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      }
    }
  }

  async function handleJoin(familyId: number) {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      clearStatus();

      await sendJoinRequest(token, user.id, familyId);
      setSuccessMsg("The Join Request Was Successfully Sent")
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch (err) {
      setErrorMsg('Request Was Already Sent');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  async function handleCreate(taskData) {
    const n = await createTask(token, taskData);
    addTask(n);
  }

  async function handleUpdate(id, data) {
    const n = await updateTask(token, id, data);
    updateTasksFunction(n);
  }

  async function handleDelete(id) {
    await deleteTask(token, id);
    removeTask(id);
  }

  async function handleApproveRequest(requestId) {
    try {
      await approveJoinRequest(token, requestId);
      setSuccessMsg("Request approved successfully!");
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg("Failed to approve request");
      setTimeout(() => setErrorMsg(''), 5000);
    }
  }

  async function handleRejectRequest(requestId) {
    try {
      await rejectJoinRequest(token, requestId);
      setSuccessMsg("Request rejected successfully!");
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg("Failed to reject request");
      setTimeout(() => setErrorMsg(''), 5000);
    }
  }


  if (!token) {
    return mode === "signup" ? (
      <Signup onSignup={handleSignup} switchToLogin={() => setMode("login")} errorMsg={errorMsg} />
    ) : (
      <Login onLogin={handleLogin} switchToSignup={() => setMode("signup")} errorMsg={errorMsg} />
    );
  }

  if (showJoinRequests) {
    return (
      <JoinRequests
        user={user}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        clearAuth={clearAuth}
        successMsg={successMsg}
        errorMsg={errorMsg}
        requests={requests}
        onApprove={handleApproveRequest}
        onReject={handleRejectRequest}
        onBack={() => setShowJoinRequests(false)}
      />
    );
  }

  if (user.familyId === null || user.familyId === undefined) {
    return <Home user={user}
      handleFamilyCreate={handleFamilyCreate}
      handleJoin={handleJoin}
      setDarkMode={setDarkMode}
      darkMode={darkMode}
      clearAuth={clearAuth}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  } else {
    return (
      <>
        <EditTask
          user={user}
          familyMembers={families}
          onCreate={handleCreate}
          setDarkMode={setDarkMode}
          darkMode={darkMode}
          clearAuth={clearAuth}
          successMsg={successMsg}
          errorMsg={errorMsg}
          onViewRequests={() => setShowJoinRequests(true)}
        />
        <TasksList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      </>
    );
  }
}

export default App;