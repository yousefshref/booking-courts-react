import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../utlits/Variables";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCurrentDate, getCurrentDateYMD } from "../utlits/Functions";
import { message } from "antd";

const ApiContext = ({ children }) => {
  const header = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };

  const path = useLocation().pathname;

  const serndVerification = async (phone) => {
    const data = {
      phone: phone,
    };
    const res = await axios.post(
      `${server}whatsapp-send-verification/`,
      data,
      header
    );
    return res;
  };

  const signUpSendVerification = async (username, phone, email, password) => {
    const res = await axios.post(`${server}signup-verification/`, {
      username: username,
      phone: phone,
      email: email,
      password: password,
    });
    return res;
  };

  const signUp = async (username, phone, email, password, verification) => {
    const res = await axios.post(`${server}signup/`, {
      username: username,
      phone: phone,
      email: email,
      password: password,
      verification: verification,
    });
    return res;
  };
  const navigate = useNavigate();
  const loginFunction = async (phone, password) => {
    const res = await axios.post(`${server}login/`, {
      phone: phone,
      password: password,
    });

    return res;
  };

  const sendPassowrdResetCode = async (phone) => {
    const res = await axios.post(`${server}password-reset/`, {
      phone: phone,
    });
    return res;
  };

  const resetPassword = async (phone, code, password) => {
    const res = await axios.put(`${server}password-reset/`, {
      phone: phone,
      code: code,
      password: password,
    });
    return res;
  };

  const sendWhastappCode = async ({ phone = "", verification = "" }) => {
    await axios.post(
      `${server}whatsapp-send-verification/?phone=${phone}&verification=${verification}`,
      {},
      header
    );
  };

  const updateUser = async (data) => {
    const res = await axios.put(`${server}user/`, data, header);
    console.log(res);
  };

  const [user, setUser] = useState({});

  const getUser = async () => {
    const res = await axios.get(`${server}user/`, header);
    setUser(res.data);
    return res;
  };

  const [profile, setProfile] = useState({});

  const checkProfile = async (token) => {
    try {
      const res = await axios.get(`${server}user/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setProfile(res.data);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkProfile(localStorage.getItem("token"));
    }
  }, []);

  const createManagerProfile = async (data) => {
    const res = await axios.post(
      `${server}user/manager/profile/create-or-update/`,
      data,
      header
    );
    return res;
  };

  const updateManagerProfile = async (data) => {
    const res = await axios.put(
      `${server}user/manager/profile/create-or-update/`,
      data,
      header
    );
    return res;
  };

  const createClientsProfile = async (data) => {
    const res = await axios.post(
      `${server}user/client/profile/create-or-update/`,
      data,
      header
    );
    return res;
  };

  const updateClientProfile = async (data) => {
    const res = await axios.put(
      `${server}user/client/profile/create-or-update/`,
      data,
      header
    );
    return res;
  };

  const [countries, setCountries] = useState([]);
  const getCountries = async () => {
    const res = await axios.get(`${server}countries/`, header);
    setCountries(res.data);
    return res;
  };

  const [cities, setCities] = useState([]);
  const getCities = async (country_id) => {
    const res = await axios.get(`${server}cities/${country_id}/`, header);
    setCities(res.data);
    return res;
  };

  const [states, setStates] = useState([]);

  const getStates = async (city_id) => {
    const res = await axios.get(`${server}states/${city_id}/`, header);
    setStates(res.data);
    return res;
  };

  const [courtTypes, setCourtTypes] = useState([]);

  const getCourtsTypes = async () => {
    const res = await axios.get(`${server}court-types/`, header);
    setCourtTypes(res.data);
  };

  const getCourts = async (name, country, city, state, type) => {
    const res = await axios.get(
      `${server}courts/?name=${name ?? ""}&type=${type ?? ""}&country=${country ?? ""}&city=${city ?? ""}&state=${state ?? ""}`,
      header
    );
    return res;
  };

  const getCourtDetail = async (court_id, details) => {
    const res = await axios.get(
      `${server}court/${court_id}/?details=${details ?? "false"}`,
      header
    );
    return res;
  };

  const getCourtImages = async (court_id) => {
    const res = await axios.get(`${server}images/${court_id}/`, header);
    return res;
  };

  const getCourtVideo = async (court_id) => {
    const res = await axios.get(`${server}videos/${court_id}/`, header);
    return res;
  };

  const getCourtTools = async (court_id) => {
    const res = await axios.get(`${server}tools/${court_id}/`, header);
    return res;
  };

  const getCourtFeatures = async (court_id) => {
    const res = await axios.get(`${server}features/${court_id}/`, header);
    return res;
  };

  const updateCourt = async (
    court_id,
    name,
    address,
    location_url,
    price_per_hour,
    open_from,
    open_to,
    close_from,
    close_to,
    is_active,
    ball_price,
    offer_price,
    offer_time_from,
    offer_time_to,
    event_price,
    event_time_from,
    event_time_to,
    country,
    city,
    state,
    type
  ) => {
    const data = {
      name: name,
      address: address,
      location_url: location_url,
      price_per_hour: price_per_hour,
      open_from: open_from,
      open_to: open_to,
      close_from: close_from,
      close_to: close_to,
      is_active: is_active,
      ball_price: ball_price,
      offer_price: offer_price,
      offer_time_from: offer_time_from,
      offer_time_to: offer_time_to,
      event_price: event_price,
      event_time_from: event_time_from,
      event_time_to: event_time_to,
      country: country,
      city: city,
      state: state,
      type: type,
    };
    const res = await axios.put(`${server}court/${court_id}/`, data, header);
    return res;
  };

  const deleteCourt = async (court_id) => {
    const res = await axios.delete(`${server}court/${court_id}/`, header);
    return res;
  };

  const deleteCourtImage = async (image_id) => {
    const res = await axios.delete(`${server}image/${image_id}/`, header);
    return res;
  };

  const deleteCourtVideo = async (video_id) => {
    const res = await axios.delete(`${server}video/${video_id}/`, header);
    return res;
  };

  const deleteCourtTool = async (tool_id) => {
    const res = await axios.delete(`${server}tool/${tool_id}/`, header);
    return res;
  };

  const deleteCourtFeature = async (feature_id) => {
    const res = await axios.delete(`${server}feature/${feature_id}/`, header);
    return res;
  };

  const updateCourtTool = async (tools) => {
    if (tools?.length > 0) {
      tools?.map(async (t) => {
        const data = new FormData();
        data.append("name", t.name);
        data.append("price", t.price);
        const res = await axios.put(`${server}tool/${t?.id}/`, data, header);
      });
    }
  };

  const updateCourtFeature = async (features) => {
    if (features?.length > 0) {
      features?.map(async (t) => {
        const data = new FormData();
        data.append("name", t.name);
        data.append("is_free", t.is_free);
        const res = await axios.put(`${server}feature/${t?.id}/`, data, header);
      });
    }
  };

  const createCourt = async (
    name,
    address,
    location_url,
    price_per_hour,
    open_from,
    open_to,
    close_from,
    close_to,
    is_active,
    ball_price,
    offer_price,
    offer_time_from,
    offer_time_to,
    event_price,
    event_time_from,
    event_time_to,
    country,
    city,
    state,
    type
  ) => {
    const data = {
      name: name,
      address: address,
      location_url: location_url,
      price_per_hour: price_per_hour,
      open_from: open_from,
      open_to: open_to,
      close_from: close_from,
      close_to: close_to,
      is_active: is_active,
      ball_price: ball_price,
      offer_price: offer_price,
      offer_time_from: offer_time_from,
      offer_time_to: offer_time_to,
      event_price: event_price,
      event_time_from: event_time_from,
      event_time_to: event_time_to,
      country: country,
      city: city,
      state: state,
      type: type,
    };

    const res = await axios.post(`${server}courts/`, data, header);
    return res;
  };

  const createCourtCloseTime = async ({ data, court_id }) => {
    data?.map(async (d) => {
      const data = {
        court: court_id,
        time: d.time,
      };
      const res = await axios.post(
        `${server}court-close-times/${court_id}/`,
        data,
        header
      );
    });
  };

  const updateCourtCloseTime = async ({ data, court_id }) => {
    data?.map(async (d) => {
      const data = {
        time: d.time,
      };
      const res = await axios.put(
        `${server}court-close-time/${d.id}/`,
        data,
        header
      );
    });
  };

  const deleteCourtCloseTime = async (id) => {
    const res = await axios.delete(`${server}court-close-time/${id}/`, header);
    return await res;
  };

  const createCourtImage = async (court_id, images) => {
    if (images?.length > 0) {
      const data = new FormData();

      data.append("court", court_id);
      images.forEach((image) => data.append("image", image));

      const res = await axios.post(
        `${server}images/${court_id}/`,
        data,
        header
      );
      return res;
    }
  };

  const createCourtVideo = async (court_id, videos) => {
    if (videos?.length > 0) {
      const data = new FormData();
      data.append("court", court_id);
      videos.forEach((video) => {
        data.append("name", video.name);
        data.append("url", video.url);
      });

      const res = await axios.post(
        `${server}videos/${court_id}/`,
        data,
        header
      );
      return res;
    }
  };

  const createCourtTool = async (court_id, tools) => {
    if (tools?.length > 0) {
      tools.map(async (tool) => {
        const data = new FormData();
        data.append("court", court_id);
        data.append("name", tool.name);
        data.append("price", tool.price);
        const res = await axios.post(
          `${server}tools/${court_id}/`,
          data,
          header
        );
      });
    }
  };

  const createCourtFeature = async (court_id, features) => {
    if (features?.length > 0) {
      const data = new FormData();
      data.append("court", court_id);
      features.forEach(async (feature) => {
        data.append("name", feature.name);
        data.append("is_free", feature.is_free);
        const res = await axios.post(
          `${server}features/${court_id}/`,
          data,
          header
        );
      });
    }
  };

  const getStaffs = async () => {
    const res = await axios.get(`${server}staffs/`, header);
    return res;
  };

  const createStaffProfile = async (user, manager) => {
    const data = {
      user: user,
      manager: manager,
    };
    const res = await axios.post(`${server}staffs/`, data, header);
    return res;
  };

  const getStaff = async (staff_id) => {
    const res = await axios.get(`${server}staff/${staff_id}/`, header);
    return res;
  };

  const updateStaffUser = async (
    staff_user_id,
    username,
    phone,
    email,
    verification
  ) => {
    const data = {
      username: username,
      email: email,
      phone: phone,
      code: verification,
    };
    const res = await axios.put(
      `${server}staff-user/${staff_user_id}/`,
      data,
      header
    );
    return res;
  };

  const deleteStaff = async (staff_id) => {
    const res = await axios.delete(`${server}staff/${staff_id}/`, header);
    return res;
  };

  const getCourtBooksDetails = async (court_id, date) => {
    const res = await axios.get(
      `${server}book/check/${court_id}/?date=${date}`,
      header
    );
    return res;
  };

  const getSettings = async () => {
    const res = await axios.get(`${server}settings/`, header);
    return res;
  };

  const updateSettings = async (
    bookingWarning,
    limitOfPayingInMinuts,
    limitOfCancelingInMinuts
  ) => {
    if (!limitOfPayingInMinuts) limitOfPayingInMinuts = 0;
    if (!limitOfCancelingInMinuts) limitOfCancelingInMinuts = 0;
    const data = {
      booking_warning: bookingWarning,
      limit_of_paying_in_minuts: limitOfPayingInMinuts,
      limit_of_canceling_in_minuts: limitOfCancelingInMinuts,
    };
    const res = await axios.put(`${server}settings/`, data, header);
    return res;
  };

  const bookCourt = async (data) => {
    const res = await axios.post(`${server}books/`, data, header);
    return res;
  };

  const getBooks = async (
    date_from,
    date_to,
    court,
    is_cancelled,
    is_paied,
    paied
  ) => {
    const url = `${server}books/?`;
    const params = {};

    if (date_from) {
      params.date_from = date_from;
    }

    if (date_to) {
      params.date_to = date_to;
    }

    if (court) {
      params.court = court;
    }

    if (is_cancelled) {
      params.is_cancelled = is_cancelled;
    }

    if (is_paied) {
      params.is_paied = is_paied;
    }

    if (paied) {
      params.paied = paied;
    }

    const res = await axios.get(url, { ...header, params });
    return res;
  };

  const getBook = async (book_id, check_cancel) => {
    const res = await axios.get(
      `${server}book/${book_id}/?check_cancel=${check_cancel}`,
      header
    );
    return res;
  };

  const updateBook = async (book_id, data) => {
    const res = await axios.put(`${server}book/${book_id}/`, data, header);
    return res;
  };

  const pinnedTimes = async (book_id) => {
    const res = await axios.get(`${server}pinned-times/${book_id}/`, header);
    return res;
  };

  const pinnedTimesUpdate = async (pinned_id, data) => {
    const res = await axios.put(
      `${server}pinned-time/${pinned_id}/`,
      data,
      header
    );
    return res;
  };

  // academies
  const [types, setTypes] = useState([]);
  const getAcademyTypes = async () => {
    const res = await axios.get(`${server}academy-types/`, header);
    setTypes(res?.data);
    return res;
  };

  const createAcademy = async (data) => {
    const res = await axios.post(`${server}academies/`, data, header);
    return res;
  };

  const updateAcademy = async (academy_id, data) => {
    const res = await axios.put(
      `${server}academy/${academy_id}/`,
      data,
      header
    );
    return res;
  };

  const deleteAcademy = async (academy_id) => {
    const res = await axios.delete(`${server}academy/${academy_id}/`, header);
    return res;
  };

  const [academies, setAcademies] = useState([]);

  const getAcademies = async (
    name,
    type,
    { country = "", city = "", state = "" }
  ) => {
    const res = await axios.get(
      `${server}academies/?name=${name ?? ""}&type=${type ?? ""}&country=${country ?? ""}&city=${city}&state=${state}`,
      header
    );
    setAcademies(res?.data);
    return await res;
  };

  const getAcademy = async (id) => {
    const res = await axios.get(`${server}academy/${id}/`, header);
    return res;
  };

  const createAcademyTime = async (data) => {
    const res = await axios.post(`${server}academy-times/`, data, header);
    return res;
  };

  const getAcademyTimes = async (academy_id) => {
    const res = await axios.get(
      `${server}academy-times/?academy_id=${academy_id}`,
      header
    );
    return res;
  };

  const getAcademyTime = async (time_id) => {
    const res = await axios.get(`${server}academy-time/${time_id}/`, header);
    return res;
  };

  const updateAcademyTime = async (time_id, data) => {
    const res = await axios.put(
      `${server}academy-time/${time_id}/`,
      data,
      header
    );
    return res;
  };

  const deleteAcademyTime = async (time_id, data) => {
    const res = await axios.delete(`${server}academy-time/${time_id}/`, header);
    return res;
  };

  const getSubscribePlans = async (academy_id) => {
    const res = await axios.get(
      `${server}academy-subscribe-plans/?academy_id=${academy_id}`,
      header
    );
    return res;
  };

  const createSubscribePlan = async (data) => {
    const res = await axios.post(
      `${server}academy-subscribe-plans/`,
      data,
      header
    );
    return res;
  };

  const updateSubscribePlan = async (plan_id, data) => {
    const res = await axios.put(
      `${server}academy-subscribe-plan/${plan_id}/`,
      data,
      header
    );
    return res;
  };

  const deleteSubscribePlan = async (plan_id) => {
    const res = await axios.delete(
      `${server}academy-subscribe-plan/${plan_id}/`,
      header
    );
    return res;
  };

  const check_auto_cancell = async () => {
    try {
      const res = await axios.get(`${server}books/auto-cancel/`, header);
      return res;
    } catch (err) {}
  };

  useEffect(() => {
    localStorage.getItem("token") && check_auto_cancell();
  }, []);

  const createWhtieList = async (data) => {
    const res = await axios.post(`${server}white-lists/`, data, header);
    return res;
  };

  const getWhtieLists = async () => {
    const res = await axios.get(`${server}white-lists/`, header);
    return res;
  };

  const updateWhtieList = async (id, data) => {
    const res = await axios.put(`${server}white-list/${id}/`, data, header);
    return res;
  };

  const deleteWhtieList = async (id) => {
    const res = await axios.delete(`${server}white-list/${id}/`, header);
    return res;
  };

  // manager courts

  const [academyId, setAcademyId] = useState(null);

  const [managerCourts, setManagerCourts] = useState([]);
  const [manaerCourtPagination, setManaerCourtPagination] = useState({});
  const [manaerCourtPaginationPage, setManaerCourtPaginationPage] = useState(1);
  const [manaerCourtPaginationLoading, setmanaerCourtPaginationLoading] =
    useState(false);

  const getManagerCourts = async () => {
    setmanaerCourtPaginationLoading(true);
    try {
      const res = await axios.get(
        `${server}manager/${academyId}/courts/?page=${manaerCourtPaginationPage}`,
        header
      );
      const { results, next, previous, count } = res.data;
      setManagerCourts(results);
      setManaerCourtPagination({ next, previous, count });
    } catch (err) {
      console.log(err);
    } finally {
      setmanaerCourtPaginationLoading(false);
      setAcademyId(null);
    }
  };

  useEffect(() => {
    if (
      academyId &&
      localStorage.getItem("token") &&
      path?.includes("managers") &&
      path?.includes("courts")
    ) {
      getManagerCourts();
    }
  }, [path, academyId, manaerCourtPaginationPage]);

  const [managerAcademies, setManagerAcademies] = useState([]);
  const [manaerAcademyPagination, setManaerAcademyPagination] = useState({});
  const [manaerAcademyPaginationPage, setManaerAcademyPaginationPage] =
    useState(1);
  const [manaerAcademyPaginationLoading, setmanaerAcademyPaginationLoading] =
    useState(false);

  const getManagerAcademies = async () => {
    setmanaerAcademyPaginationLoading(true);
    try {
      const res = await axios.get(
        `${server}manager/${academyId}/academies/?page=${manaerAcademyPaginationPage}`,
        header
      );
      const { results, next, previous, count } = res.data;
      setManagerAcademies(results);
      setManaerAcademyPagination({ next, previous, count });
    } catch (err) {
      console.log(err);
    } finally {
      setmanaerAcademyPaginationLoading(false);
      setAcademyId(null);
    }
  };

  useEffect(() => {
    if (
      academyId &&
      localStorage.getItem("token") &&
      path?.includes("managers") &&
      path?.includes("academies")
    ) {
      getManagerAcademies();
    }
  }, [path, academyId, manaerAcademyPaginationPage]);

  const [incomes, setIncomes] = useState([]);
  const [incomeLoading, setIncomeLoading] = useState(false);

  const [from_date, setFromDate] = useState(getCurrentDate() || "");
  const [to_date, setToDate] = useState(getCurrentDate() || "");

  const getIncomes = async () => {
    setIncomeLoading(true);
    try {
      const res = await axios.get(
        `${server}incomes/?from_date=${from_date}&to_date=${to_date}`,
        header
      );
      setIncomes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIncomeLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      path?.includes("manager") &&
      path?.includes("balance")
    ) {
      getIncomes();
    }
  }, [path]);

  const createIncome = async (data) => {
    try {
      const res = await axios.post(`${server}incomes/`, data, header);
      if (res?.data) {
        getIncomes();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIncome = async (id) => {
    try {
      const res = await axios.delete(`${server}income/${id}`, header);
      getIncomes();
    } catch (err) {
      console.log(err);
    }
  };

  const updateIncome = async (id, data) => {
    try {
      const res = await axios.put(`${server}income/${id}/`, data, header);
      if (res?.data) {
        getIncomes();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [expenses, setExpenses] = useState([]);
  const [expenseLoading, setExpenseLoading] = useState(false);

  const [from_date_expense, setFromDateexpense] = useState(
    getCurrentDate() || ""
  );
  const [to_date_expense, setToDateexpense] = useState(getCurrentDate() || "");

  const getExpenses = async () => {
    setExpenseLoading(true);
    try {
      const res = await axios.get(
        `${server}expenses/?from_date=${from_date_expense}&to_date=${to_date_expense}`,
        header
      );
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setExpenseLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      path?.includes("manager") &&
      path?.includes("balance")
    ) {
      getExpenses();
    }
  }, [path]);

  const createExpense = async (data) => {
    try {
      const res = await axios.post(`${server}expenses/`, data, header);
      if (res?.data?.id) {
        getExpenses();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const res = await axios.delete(`${server}expense/${id}`, header);
      getExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const updateExpense = async (id, data) => {
    try {
      const res = await axios.put(`${server}expense/${id}/`, data, header);
      if (res?.data) {
        getExpenses();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [msg, messageApi] = message.useMessage();

  const error = (m) => {
    msg.error(m);
  };

  const success = (m) => {
    msg.success(m);
  };

  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);

  const [subscriptionPhone, setSubscriptionPhone] = useState("");

  const [openSubscriptions, setOpenSubscriptions] = React.useState(false);

  const getSubscriptions = async ({
    academy_id = "",
    trainer_id = "",
    plan_id = "",
    from_date = "",
    to_date = "",
    is_approved = "",
    requests_from_profile = "",

    onlyAcademies = "",
    onlyTrainers = "",
  }) => {
    setLoadingSubscriptions(true);
    try {
      const res = await axios.get(
        `${server}subscriptions/?phone=${subscriptionPhone}&only_academies=${onlyAcademies}&only_trainers=${onlyTrainers}&sub_id=${plan_id}&from_date=${from_date}&to_date=${to_date}&is_approved=${is_approved}&requests_from_profile=${requests_from_profile}&trainer_id=${trainer_id}&academy_id=${academy_id}`,
        header
      );
      setSubscriptions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  const createSubscription = async (data) => {
    setLoadingSubscriptions(true);
    try {
      const res = await axios.post(`${server}subscriptions/`, data, header);
      return await res.data;
    } catch (err) {
      console.log(err);
      return await err;
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  const updateSubscription = async (id, data) => {
    setLoadingSubscriptions(true);
    try {
      const res = await axios.put(`${server}subscription/${id}/`, data, header);
      return await res.data;
    } catch (err) {
      console.log(err);
      return await err;
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  const [subscriptionRenewalsDetail, setSubscriptionRenewalsDetail] = useState(
    []
  );

  const getSubscriptionRenewalsDetail = async (subscribeId) => {
    setLoadingSubscriptions(true);
    try {
      const res = await axios.get(
        `${server}subscription-renew-details/${subscribeId}/`,
        header
      );
      setSubscriptionRenewalsDetail(res.data);
      return await res.data;
    } catch (err) {
      console.log(err);
      return await err;
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  const renewSubscription = async (id, data) => {
    setLoadingSubscriptions(true);
    try {
      const res = await axios.post(
        `${server}subscription-renew/${id}/`,
        data,
        header
      );
      return await res.data;
    } catch (err) {
      console.log(err);
      return await err;
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  const deleteSubscribe = async (id) => {
    setLoadingSubscriptions(true);
    try {
      const res = await axios.delete(`${server}subscription/${id}/`, header);
      getSubscriptions({});
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  const [trainers, setTrainers] = useState([]);
  const [trainerLoading, setTrainerLoading] = useState(false);

  const getTrainers = async ({
    type = "",
    priceFrom = "",
    priceTo = "",
    manager = "",
  }) => {
    setTrainerLoading(true);
    try {
      const res = await axios.get(
        `${server}academy-trainers/?type_id=${type || ""}&price_from=${priceFrom}&price_to=${priceTo}&manager=${manager}`,
        header
      );
      setTrainers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setTrainerLoading(false);
    }
  };

  const createTrainer = async (data, setOpen) => {
    setTrainerLoading(true);
    try {
      const res = await axios.post(`${server}academy-trainers/`, data, header);
      if (res?.data?.id) {
        getTrainers({});
        success("تمت الاضافة بنجاح");
        setOpen(false);
      } else {
        Object?.entries(res?.data).map(([key, value]) => {
          error(`${key}: ${value?.join(", ")}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTrainerLoading(false);
    }
  };

  const [trainer, setTrainer] = useState({});
  const getTrainer = async (id) => {
    setTrainerLoading(true);
    try {
      const res = await axios.get(`${server}academy-trainer/${id}/`, header);
      setTrainer(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setTrainerLoading(false);
    }
  };

  const updateTrainer = async (id, data, setOpen) => {
    setTrainerLoading(true);
    try {
      const res = await axios.put(
        `${server}academy-trainer/${id}/`,
        data,
        header
      );
      if (res?.data?.id) {
        getTrainers({});
        success("تمت التعديل بنجاح");
        setOpen(false);
      } else {
        Object?.entries(res?.data).map(([key, value]) => {
          error(`${key}: ${value?.join(", ")}`);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTrainerLoading(false);
    }
  };

  const deleteTrainer = async (id, setOpen) => {
    setTrainerLoading(true);
    try {
      const res = await axios.delete(`${server}academy-trainer/${id}/`, header);
      getTrainers({});
      success("تمت الاضافة بنجاح");
      setOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setTrainerLoading(false);
    }
  };

  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await axios.get(`${server}notifications/`, header);
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createNotification = async (data) => {
    try {
      const res = await axios.post(`${server}notifications/`, data, header);
      getNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  const updateNotification = async ({ id = "", data = {} }) => {
    try {
      const res = await axios.put(
        `${server}notifications/${id}/`,
        data,
        header
      );
      getNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ApiContextProvider.Provider
      value={{
        messageApi,
        navigate,

        sendPassowrdResetCode,
        resetPassword,

        notifications,
        getNotifications,
        createNotification,
        updateNotification,

        trainers,
        setTrainers,
        trainerLoading,
        setTrainerLoading,
        getTrainers,
        trainer,
        getTrainer,
        createTrainer,
        updateTrainer,
        deleteTrainer,

        subscriptions,
        setSubscriptions,
        subscriptionPhone,
        setSubscriptionPhone,
        openSubscriptions,
        setOpenSubscriptions,
        loadingSubscriptions,
        setLoadingSubscriptions,
        getSubscriptions,
        createSubscription,
        updateSubscription,
        subscriptionRenewalsDetail,
        getSubscriptionRenewalsDetail,
        renewSubscription,
        deleteSubscribe,

        expenses,
        expenseLoading,
        from_date_expense,
        setFromDateexpense,
        to_date_expense,
        setToDateexpense,
        getExpenses,
        createExpense,
        deleteExpense,
        updateExpense,

        incomes,
        incomeLoading,
        from_date,
        setFromDate,
        to_date,
        setToDate,
        getIncomes,
        createIncome,
        deleteIncome,
        updateIncome,

        // manager courts
        academyId,
        setAcademyId,

        managerCourts,
        getManagerCourts,
        manaerCourtPaginationPage,
        setManaerCourtPaginationPage,
        manaerCourtPagination,
        manaerCourtPaginationLoading,
        setmanaerCourtPaginationLoading,

        managerAcademies,
        getManagerAcademies,
        manaerAcademyPaginationPage,
        setManaerAcademyPaginationPage,
        manaerAcademyPagination,
        manaerAcademyPaginationLoading,
        setmanaerAcademyPaginationLoading,

        // whitelst
        createWhtieList,
        getWhtieLists,
        updateWhtieList,
        deleteWhtieList,

        // academies
        types,
        setTypes,
        getAcademyTypes,

        academies,
        getAcademies,
        getAcademy,
        createAcademy,
        updateAcademy,
        deleteAcademy,

        getAcademyTimes,
        getAcademyTime,
        createAcademyTime,
        updateAcademyTime,
        deleteAcademyTime,

        getSubscribePlans,
        createSubscribePlan,
        updateSubscribePlan,
        deleteSubscribePlan,

        serndVerification,

        loginFunction,
        signUpSendVerification,
        signUp,

        sendWhastappCode,

        updateUser,
        user,
        setUser,
        getUser,
        profile,
        checkProfile,
        createManagerProfile,
        updateManagerProfile,
        createClientsProfile,
        updateClientProfile,

        countries,
        getCountries,
        cities,
        getCities,
        states,
        getStates,
        courtTypes,

        getCourtsTypes,
        getCourts,

        getCourtDetail,
        getCourtImages,
        getCourtVideo,
        getCourtTools,
        getCourtFeatures,

        updateCourt,
        deleteCourt,
        deleteCourtImage,
        deleteCourtVideo,
        deleteCourtTool,
        deleteCourtFeature,
        updateCourtTool,
        updateCourtFeature,

        createCourt,
        createCourtCloseTime,
        updateCourtCloseTime,
        deleteCourtCloseTime,
        createCourtImage,
        createCourtVideo,
        createCourtTool,
        createCourtFeature,

        // staffs
        getStaffs,
        createStaffProfile,
        getStaff,
        updateStaffUser,
        deleteStaff,

        getCourtBooksDetails,

        // settings
        getSettings,
        updateSettings,

        // book court
        bookCourt,
        getBooks,
        getBook,
        updateBook,

        pinnedTimes,
        pinnedTimesUpdate,
      }}
    >
      {children}
    </ApiContextProvider.Provider>
  );
};

export const ApiContextProvider = createContext();
export default ApiContext;
