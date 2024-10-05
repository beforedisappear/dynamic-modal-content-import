"use client";

interface IProps {
  dict: {
    title: string;
    subtitle: string;
    submitBtn: string;
  };
}

export function AuthForm({ dict }: IProps) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("123");
  };

  console.log("auth form dynamic render");

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input id="123" type="text" />
      <label htmlFor="123" style={{ color: "black" }}>
        {dict.title}
      </label>

      <input type="text" />
      <label htmlFor="456" style={{ color: "black" }}>
        {dict.subtitle}
      </label>

      <button>{dict.submitBtn}</button>
    </form>
  );
}
