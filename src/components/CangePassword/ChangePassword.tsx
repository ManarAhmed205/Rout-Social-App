import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ImSpinner3 } from "react-icons/im";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleChangePassword() {
    return axios.patch(
      "https://route-posts.routemisr.com/users/change-password",
      { password, newPassword },
      { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } },
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleChangePassword,
    onSuccess: () => {
      setErrorMsg("");
      setSuccessMsg("Password changed successfully");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err) => {
      setSuccessMsg("");
      if (axios.isAxiosError(err)) {
        console.log(err.response?.status, JSON.stringify(err.response?.data));
        setErrorMsg(err.response?.data?.message ?? "Something went wrong");
      }
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirmation do not match");
      return;
    }
    if (newPassword === password) {
      setErrorMsg("New password must be different from the current one");
      return;
    }
    mutate();
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm outline-none focus:border-[#1877f2] focus:bg-white";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-extrabold text-slate-900">Change password</h2>

      <input
        type="password"
        placeholder="Current password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className={inputClass}
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={inputClass}
      />

      {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

      <button
        type="submit"
        disabled={isPending || !password || !newPassword || !confirmPassword}
        className="flex w-full items-center justify-center rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? <ImSpinner3 className="animate-spin" /> : "Change password"}
      </button>
    </form>
  );
}