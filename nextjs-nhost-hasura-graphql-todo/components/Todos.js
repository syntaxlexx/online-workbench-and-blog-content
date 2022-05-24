import styles from "../styles/Home.module.css";

export default function Todos({ loading, error, data }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No Data!</p>;

  return (
    <div className={styles.grid}>
      {data.todos.map((todo, index) => (
        <div key={todo.id} className={styles.card}>
          {index + 1}. {todo.title}
        </div>
      ))}
    </div>
  );
}
