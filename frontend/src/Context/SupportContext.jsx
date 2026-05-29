import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLogin } from "./LoginContext";
const SupportContext = createContext();

export const SupportProvider = ({ children }) => {
  const { token, role } = useLogin();

  //--------------------support ticket---------------------//
  const [supportTicket, setSupportTicket] = useState(null);
  const fetchSupportTicket = async () => {
    const url = "https://cartify-vq4o.onrender.com/cartify/support-ticket";
    try {
      const res = await axios.get(url, { headers: { Authorization: token } });
      setSupportTicket(res?.data?.supportRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token && role === "customer") {
      fetchSupportTicket();
    }
  }, [token, role]);

  const raiseSupportTicket = async (supportInput) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/raise-ticket";
    try {
      const res = await axios.post(url, supportInput, {
        headers: { Authorization: token },
      });
      toast.success(res?.data?.message);
      fetchSupportTicket();
    } catch (error) {
      toast.info(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  const updateSupportTicketCus = async (supportInput) => {
    const url = "https://cartify-vq4o.onrender.com/cartify/update-support-ticket";
    try {
      const res = await axios.put(url, supportInput, {
        headers: { Authorization: token },
      });
      console.log(res?.data);
      toast.success(res?.data?.message);
      fetchSupportTicket();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  return (
    <SupportContext.Provider
      value={{
        supportTicket,
        fetchSupportTicket,
        raiseSupportTicket,
        updateSupportTicketCus,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => useContext(SupportContext);
