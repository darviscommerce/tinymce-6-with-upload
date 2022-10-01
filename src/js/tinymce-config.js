var external_filemanager_path = '/src/tinymanager/'
tinymce.init({
  language: 'nl',
  selector: '#mytextarea',
  content_css: 'css/style.css',
  images_upload_url: 'tinymanager/upload.php',

  /**
   * Options
   */
  browser_spellcheck: true,
  contextmenu: false, // Disabling the contextmenu option may be required depending on the right-click or context usability requirement.
  relative_urls: false, // Keep slash at the front of an url
  image_advtab: true,
  /**
   * Menu
   */
  plugins:
    'media image link table save code charmap emoticons advlist lists wordcount searchreplace help darvisfilemanager',
  toolbar: [
    'save darvisfilemanager | searchreplace undo redo | bold italic underline strikethrough | alignleft aligncenter alignright | link media image',
    'charmap emoticons |  numlist bullist',
    'styles fontfamily fontsize | forecolor backcolor removeformat ',
    'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
  ],
  menubar: 'insert tools table',
  /**
   * Save content
   */
  save_enablewhendirty: false,
  save_oncancelcallback: function () {
    alert('Save canceled')
  },
  save_onsavecallback: function () {
    var element = $($(this.getElement())),
      language = $(element).data('language'),
      content_id = $(element).data('content_id'),
      col = $(element).data('col'),
      content = this.getContent()
    /**
     * Store example with jQuery
     */
    $.ajax({
      method: 'POST',
      url: 'tinymanager/save_content.php',
      data: {
        language: language,
        content_id: content_id,
        col: col,
        content: content,
      },
      dataType: 'json',
    })
    alert('Saved \r\n')
  },
  setup: (editor) => {
    editor.on('click', () => {
      console.log('Editor was clicked')
    })
    editor.options.register('custom_option', {
      processor: 'string',
      default: external_filemanager_path,
    })
  }
})
