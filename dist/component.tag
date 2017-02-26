<component>

  <h1 class="title is-1">Service worker test</h1>

  <button class="button" type="button" onclick={ sendTask }>Send task</button>

  <script>
    sendTask(event) {
      event.preventUpdate = true;
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function(event) {
        if (event.data.error) {
          console.error(event.data.error);
        } else {
          console.log(event.data);
        }
      };

      const task = {
        query: 'test',
        filename: 'TEST',
      };
      const anotherTask = {
        query: 'another',
        filename: 'ANOTHER',
      };

      navigator.serviceWorker.controller.postMessage(
        task,
        [messageChannel.port2]
      );

      navigator.serviceWorker.controller.postMessage(
        anotherTask
      );
    }
  </script>

</component>