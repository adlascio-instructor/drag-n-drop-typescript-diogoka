# Drag-n-Drop Project - TypeScript

## Description

This project is a simple drag-n-drop project using TypeScript. Users can drag-n-drop projects between different sections of the page.

## Instructions

### <ins>**Step 0:**</ins>

Before we start coding, let's understand what we already have in the project.

Inside of the `index.html` file, we have a new tag called `template`. This tag is used to store HTML code that we can use later in our JavaScript code. If we run this project with live server, we will see that the `template` tag is not visible in the browser.

All the code written by you will be stored in TypeScript files, inside of the `src` folder. The TypeScript files will be compiled into JavaScript files and stored in the `dist` folder. The `index.html` file will use the JavaScript files, not the TypeScript files.

The `tsconfig.json` file is already configured for this project. You don't need to change anything in this file. However, I recommend you to read what properties are active in this file.

### <ins>**Step 1:**</ins>

As you can see, we have 3 different templates in the `index.html` file:

- `project-input`: this template will be used to create a new project
- `single-project`: this template will be used to display a single project
- `project-list`: this template will be used to display a list of projects

We will need to create a class for each template. Let's start with the `project-input` template.

- Create a new branch called `step1` and checkout to this branch.
- Create a new folder called `components` and inside that, a file called `ProjectInput.ts`
- In this file, create a new class called `ProjectInput` that will have 2 properties: `templateElement` and `hostElement`
- Store the values of the `templateElement` and `hostElement` in the constructor, by getting elements by their id.

> Remember that getting elements by their id can return `null` if the element is not found. Also, you will need type casting to tell TypeScript which element type you are getting.

- Still in the constructor, add this code below:

  ```typescript
  // Get the content of the template
  const importedNode = document.importNode(this.templateElement.content, true);
  // Get the form element from the template
  this.element = importedNode.firstElementChild as HTMLFormElement;
  // Add a new id to the form
  this.element.id = "user-input";
  // Attach the form to the host element
  this.attach();
  ```

- At this point, you will probably see an error in the `this.element` line and in the `this.attach()`. This is because we haven't created the `element` property and the `attach` method yet.
- Create the `element` property and the `attach` method as `private` method.
- The `attach` method should append the `this.element` to the `this.hostElement`.
- Now, export the `ProjectInput` class and import it in the `app.ts` file.
- In the `app.ts` file, create a new instance of the `ProjectInput` class.
- If you run the project with live server, you will see that the form is now visible in the browser.

> Make sure that you compile the TypeScript files before running the project. You can keep the TypeScript files compiling automatically by using the `--watch` flag in the terminal.

- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step1` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 2:**</ins>

Now that we have the form visible in the browser, let's add some functionality to it.

- Create a new branch called `step2` and checkout to this branch.
- In the `ProjectInput` class, add 3 new properties: `titleInputElement`, `descriptionInputElement` and `peopleInputElement`.
- In the constructor, before calling the `attach` method, get the elements by their id and store them in the new properties.
- After that, call the `configure` method.
- Create the `configure` method as `private` method. This method will add an event listener to the form. It will listen to the `submit` event and call the `submitHandler` method.
- Create the `submitHandler` method as `private` method. This method will prevent the default behavior of the form and log the values of the form inputs.

> When using `this` inside callback methods, you will need to bind the `this` to the class.

- **Bonus:** It is time to practice `decorators`! Try to implement the `autobind` decorator in the `submitHandler` method.

> In case of using decorators, activate the `experimentalDecorators` property in the `tsconfig.json` file.

- Test it in the browser. If you type something in the form and click on the submit button, you will see the values of the form inputs in the console.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step2` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 3:**</ins>

To finish the form, we need to add some validation to it.

- Create a new branch called `step3` and checkout to this branch.
- In the `ProjectInput` class, create the `gatherUserInput` method as `private` method. This method will get the values of the form inputs and validate them. The return type of this method should be `Tuple`.
- In the case of invalid data, the method should return `void` and show an alert message.
- Inside of the `submitHandler` method, call the `gatherUserInput` method and store the result in a new variable called `userInput`.
- If the `userInput` is an array, use the `destructuring` to get the values of the array and log them in the console.
- To finalize the form, create the `clearInputs` method as `private` method. This method will clear the values of the form inputs.
- Call the `clearInputs` method inside of the `submitHandler` method, after logging the values of the form inputs.
- Test it in the browser. If you type something in the form and click on the submit button, you will see the values of the form inputs in the console. Make sure that you test the invalid data as well.

### <ins>**Step 4:**</ins>

Our validation is working but we should make this validation reusable.

- Create a new branch called `step4` and checkout to this branch.
- Create a new folder called `helpers` and inside that, a file called `validation.ts`.
- In the `validation.ts` file, copy and paste this interface:

  ```typescript
  interface Validatable {
    value: string | number; // The value of the input
    required?: boolean; // If the input is required
    minLength?: number; // The minimum length of the input (for strings)
    maxLength?: number; // The maximum length of the input (for strings)
    min?: number; // The minimum value of the input (for numbers)
    max?: number; // The maximum value of the input (for numbers)
  }
  ```

- In the `validation.ts` file, create a new function called `validate` that will receive an object as argument. This object should be of type `Validatable`.
- Inside of the `validate` function, create a new variable called `isValid` and set it to `true`.
- Based on the properties of the object, validate the value of the input and change the value of the `isValid` variable to `false` if the validation fails.
- Return the `isValid` variable.
- In the `ProjectInput` class, import the `validate` function and `Validatable` interface from the `validation.ts` file.
- In the `gatherUserInput` method, create new variables called `titleValidatable`, `descriptionValidatable` and `peopleValidatable`. These variables should be of type `Validatable`. Set the properties of these variables based on the properties of the form inputs.
- Call the `validate` function for each of the variables inside of the if statement. If the validation fails, show an alert message.
- Test it in the browser and make sure that our refactored validation is working.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step4` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 5:**</ins>

Now that we have the form working, let's create a new class to render the projects.

- Create a new branch called `step5` and checkout to this branch.
- Create a new file called `project-list.ts` inside the `components` folder.
- In the `project-list.ts` file, create a new class called `ProjectList`.
- This class should have 3 properties: `templateElement`, `hostElement` and `element`.
- In the constructor, should receive `type` as argument. This argument should be an union type and should be either `active` or `finished`. Use shorthand syntax to initialize the property as `private`.
- Inside the constructor, copy from the constructor of the `ProjectInput` class and make the necessary changes.
- The `id` of the element should be `#${this.type}-projects`.
- Create the `attach` method as `private` method. This method should append the `this.element` to the `this.hostElement`.
- Create the `renderContent` method as `private` method.
- Inside of the `renderContent` method, create a new variable called `listId` and set it to `#${this.type}-projects-list`.
- Set the `id` of the `ul` element to `listId`.
- Set the `textContent` of the `h2` element to `this.type.toUpperCase() + ' PROJECTS'`.
- Call the `renderContent` method after the `attach` method in the constructor.
- In the `app.ts` file, import the `ProjectList` class.
- Create two new instances of the `ProjectList` class and pass `active` and `finished` as argument.
- Test it in the browser. You should see two lists in the browser.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step5` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 6:**</ins>

Now, we need to get the information from the form and render it on the lists.

- Create a new branch called `step6` and checkout to this branch.
- Create a new file called `ProjectState.ts` inside the `components` folder.
- In the `ProjectState.ts` file, create a new class called `ProjectState`.
- This class should be a `singleton` class.

> Use our `singleton` implementation from the lecture.

- This class should have `projects` as `private` property. This property should be an array of objects and should be of type `Project`, but for now, set it to `any[]` and initialize it as an empty array.
- Create a new method called `addProject` that will receive `title`, `description` and `people` as arguments. This method should create a new object with these arguments, including `id` as a random number coverted to `string` and push it to the `projects` array.
- Create a new variable called `projectState` and set it to a instance of `ProjectState` class. Export this variable as `const`.
- In the `ProjectInput` class, import the `projectState` variable from the `ProjectState.ts` file.
- In the `submitHandler` method, call the `addProject` method from the `projectState` variable and pass the values of the form inputs as arguments.
- In the `ProjectState` create a new `private` property called `listeners`. This property should be an array of functions and should be of type `Listener`, but for now, set it to `any[]` and initialize it as an empty array.
- Create a new method called `addListener` that will receive a function `listenerFn` as argument. This method should push the `listenerFn` to the `listeners` array.
- The idea is that when we add a new project, we will call all the functions inside of the `listeners` array.
- After pushing the new project to the `projects` array, loop through the `listeners` array and call all the functions inside of it. Pass a copy of `projects` array as argument.

> Use the `slice` method or the spread operator to create a copy of the `projects` array.

- In the `ProjectList` class, create a new property called `assignedProjects` and set it to an empty array.
- Create a new method called `renderProjects`. This method should loop through the `assignedProjects` array and create a new `li` element for each project. Set the `textContent` of the `li` element to the title of the project. Append the `li` element to the `ul` element identified by `#${this.type}-projects-list`.
- In the constructor of the `ProjectList` class, call the `addListener` method from the `projectState` variable and pass a function as argument. This function assign `projects` received as a parameter to the `assignedProjects` property and call the `renderProjects` method.
- Test it in the browser. You should see the projects being rendered in the lists after submitting the form.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step6` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 7:**</ins>

Now, we are going to create more classes and custom types to improve our code.

- Create a new branch called `step7` and checkout to this branch.
- Create a new folder called `models` inside `src` folder and create a new file called `project.ts` inside this folder.
- In the `project.ts` file, create a new class called `Project`.
- This class should have 4 properties: `id`, `title`, `description`, `people` and a new property that we haven't created yet called `status`.
- The idea for the `status` is to filter the projects based on the status. This property should be of type `ProjectStatus` and should be an enum.
- Create the `ProjectStatus` enum with 2 values: `Active` and `Finished`.
- In the `ProjectState` class, change the type of the `projects` property to `Project[]`.
- In the `addProject` method, instantiate a new `Project` object and pass the arguments received as parameters. Set the `status` property to `ProjectStatus.Active`.
- In the `ProjectList` class, change the type of the `assignedProjects` property to `Project[]`.
- In the `ProjectState` class, create a new type called `Listener` and set it to a function that receives a `Project[]` as argument and returns `void`.
- In the `ProjectState` class, change the type of the `listeners` property to `Listener[]`.
- In the `ProjectState` class, change the type of the `addListener` method to `addListener(listenerFn: Listener)`.
- In the `ProjectList` class, when calling the `addListener` method, change the type of the parameter to `projects: Project[]`.
- Test it in the browser. Everything should work as before.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step7` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 8:**</ins>

Now, we need to fix the duplication of projects in the list and only add the project to the list that matches the status of the list.

- Create a new branch called `step8` and checkout to this branch.
- In the `ProjectList` class, filter the `projects` received as parameter based on the status and assign it to the `assignedProjects` property.
- That should only add the projects to the list that matches the status of the list. Test it in the browser.
- If works, now we need to fix the duplication of projects in the list.
- Inside of the `renderProjects` method, clear the `ul` element before looping through the `assignedProjects` array.
- That is not the ideal solution, but it works for now.
- Test it in the browser.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step8` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 9:**</ins>

If you noticed, we have some duplicated code in the `ProjectInput` and `ProjectList` classes. Let's fix that.

- Create a new branch called `step9` and checkout to this branch.
- Create a new file called `base-component.ts` inside the `components` folder.
- In the `base-component.ts` file, create a new class called `Component`. This class should be abstract.
- Check the common properties and these properties will be added to the `Component` class.
- `templateElement`, `hostElement` and `element` are the common properties.
- This class should have generic types for `hostElement` and `element`. Both should constraint to `HTMLElement`.
- In the constructor, we should receive the `templateId`, `hostElementId` and `newElementId` as arguments. `newElementId` should be optional.
- Copy the constructor code from the `ProjectList` class to the `Component` class. Make the necessary changes.
- Copy the attach method from the `ProjectList` class to the `Component` class.
- Add `configure` and `renderContent` methods to the `Component` class. Both should be abstract methods.
- In the `ProjectInput` class, extends `Component` class. Make the necessary changes.

> Move the `addListener` code to the `configure` method.

- Do the same for the `ProjectInput` class. Make the necessary changes.

> `renderContent` could be an empty method to satisfy the abstract class.

- Test it in the browser. Everything should work as before.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step9` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 10:**</ins>

Now, we are going to create a new class called `ProjectItem` to render the projects in the list.

- Create a new branch called `step10` and checkout to this branch.
- Create a new file called `ProjectItem.ts` inside the `components` folder.
- In the `ProjectItem.ts` file, create a new class called `ProjectItem` and extends the `Component` class.
- In the constructor, receive the `hostId` and `project` as arguments.
- Inside the constructor, call the `super` method and pass the `templateId`, `hostId`, `newElementId` (id of the product) as arguments.
- In the `configure` method, you can keep it empty for now.
- In the `renderContent` method, set the `textContent` of the `h2` element to the `title` of the `project`.
- Set the `textContent` of the `h3` element to the `people` of the `project`.
- Set the `textContent` of the `p` element to the `description` of the `project`.
- Test it in the browser.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step10` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 11:**</ins>

In the project item, we are not specifying what the number of people is. Let's fix that.

- Create a new branch called `step11` and checkout to this branch.
- In the `ProjectItem` class, create a new getter method called `members` and set the return type to `string`.
- In the `members` method, check if the `project.people` is equal to `1` and return `1 member assigned`.
- If not, return `${this.project.people} members assigned`.
- In the `renderContent` method, set the `textContent` of the `h3` element to the `members` method.
- Test it in the browser.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step11` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 12:**</ins>

Now, we are going to make things draggable and dropable.

- Create a new branch called `step12` and checkout to this branch.
- Inside of the `helpers` folder, create a new file called `drag-drop.ts`.
- In the `drag-drop.ts` file, create a new interface called `Draggable`.
- In the `Draggable` interface, create a new method called `dragStartHandler` and set the return type to `void`. This method should receive an `event` with type of `DragEvent` as argument.
- Same for the `dragEndHandler` method.
- Create another interface called `DragTarget`.
- In the `DragTarget` interface, create a new method called `dragOverHandler` and set the return type to `void`. This method should receive an `event` with type of `DragEvent` as argument.
- Same for the `dropHandler` method.
- Same for the `dragLeaveHandler` method.
- Your code should look like this:

```ts
export interface Draggable {
  dragStartHandler(event: DragEvent): void; // allow to drag
  dragEndHandler(event: DragEvent): void; // when the drag ends
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; // when the draggable element is over the target
  dropHandler(event: DragEvent): void; // when the draggable element is dropped
  dragLeaveHandler(event: DragEvent): void; // when the draggable element is leaving the target
}
```

- Implement the `Draggable` interface in the `ProjectItem` class.
- Inside the `configure` method, add a event listener to the `li` element for the `dragstart` event and call the `dragStartHandler` method.
- Add another event listener to the `li` element for the `dragend` event and call the `dragEndHandler` method.
- Use the `autobind` decorator for both methods.
- If you try to test it in the browser, nothing will happen. That's because we need to set the `draggable` attribute to `true` in the `li` element in the HTML file.
- Add logs to console to see when the events are triggered.
- Test it in the browser.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step12` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 13:**</ins>

Now, we are going to implement the `DragTarget` interface in the `ProjectList` class.

- Create a new branch called `step13` and checkout to this branch.
- In the `ProjectList` class, implement the `DragTarget` interface.
- Inside the `configure` method, add a event listener to the `ul` element for the `dragover` event and call the `dragOverHandler` method.
- Add another event listener to the `ul` element for the `drop` event and call the `dropHandler` method.
- Add another event listener to the `ul` element for the `dragleave` event and call the `dragLeaveHandler` method.
- Use the `autobind` decorator for all methods.
- In the `dragOverHandler` method, add a new class to the `ul` element called `droppable`.
- In the `dragLeaveHandler` method, remove the `droppable` class from the `ul` element.
- Test it in the browser. You should see the background color of the `ul` element changing when you drag the `li` element over it.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step13` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 14:**</ins>

So far, we are able to visually drag and drop the projects. However, we are not able to transfer any data.

- Create a new branch called `step14` and checkout to this branch.
- In the `ProjectItem` class, inside of the `dragStartHandler` method, add a new property called `dataTransfer` to the `event` object and set the value to `this.project.id`. Also, set the `effectAllowed` property to `move`.

```ts
event.dataTransfer!.setData("text/plain", this.project.id);
event.dataTransfer!.effectAllowed = "move";
```

> This code will allow us to move the element and once dropped, we will be able to access the data.

- In the `ProjectList` class, inside of the `dragOverHandler` method, check if the `event` object has the `dataTransfer` property and if the first type of the `types` array is equal to `text/plain`. If it does, call the `preventDefault` method to allow the drop.
- In the `dropHandler` method, log the `event.dataTransfer!.getData('text/plain')` to see what we have access to.
- Test it in the browser. You should see the `id` of the project in the console.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step14` branch into the `master` branch.
- Switch back to the `master` branch.

### <ins>**Step 15:**</ins>

As the last step, we need to update both lists when we drop a project.

- Create a new branch called `step15` and checkout to this branch.
- In the `ProjectState`, create a new method called `moveProject`. This method should receive an `id` with type of `string` as argument and `newStatus` with type of `ProjectStatus` as argument.
- In the method, create a new variable called `foundProject` and set the value to the return of the `find` method on the `projects` array.
- If `foundProject` is not `undefined` and the `newStatus` is different from project status, then set the `status` property to `newStatus`.
- Create a new method called `updateListeners` and move the loop from `addProject` method to this method.
- Call this new method in the `addProject` method and in the `moveProject` method after changing the status.
- In the `ProjectList` class, inside of the `dropHandler` method, call the `moveProject` method on the `projectState` object and pass the `id` of the project and the new status of the list, depending on the type of the list.
- Test it in the browser. You should see the project moving from one list to another. Try to move it back to the original list.
- Commit your changes and push your code to GitHub.
- Create a pull request to merge your `step15` branch into the `master` branch.
- Switch back to the `master` branch.

  **Congratulations! You have successfully completed the project!** 🎉🎉🎉
