function MealPlanForm() {
  return (
    <div>
      <h1>Meal Plan Form</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <label>
          Price:
          <input type="number" name="price" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default MealPlanForm;