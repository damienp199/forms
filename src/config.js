// Configuration variables
const config = {
    excludePages: ['/', '/tags/', '/tag/*', '/a-propos/'],
    method: 'exit', // Possible values: 'exit', 'scroll', 'time', 'disabled'
    timeOnSite: 0, // Value in seconds
    popupAfterDays: 0, // number of days to wait before showing the popup again to the same user
    popupFormID: '4p', // Form ID to be displayed in the popup
    popupTemplate: `
      <div class="overlay" id="popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 1000; justify-content: center; align-items: center;">
        <div class="popup" style="background-color: #fff; padding: 30px; max-width: 500px; width: 90%; border-radius: 10px; text-align: center; position: relative;">
          <button id="close-popup" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
          <div id="popup-content"></div>
        </div>
      </div>
    `,
    forms: {
      'wfo': `
        <h3 style="text-align: center; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">S'abonner aux mises à jour par e-mail</h3>
        <form method="POST" action="https://organisologie55050.activehosted.com/proc.php" class="subscribe-form" novalidate style="width: 100%; padding: 20px; border-radius: 4px; font-family: Arial, sans-serif; box-sizing: border-box;">
          <input type="hidden" name="u" value="1" />
          <input type="hidden" name="f" value="1" />
          <input type="hidden" name="s" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
        
          <input type="email" class="email-input" name="email" placeholder="Saisissez votre e-mail" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
          <div class="error-message" style="color: red; display: none;">Veuillez saisir une adresse e-mail valide.</div>
        
          <button class="submit-button" type="submit" style="width: 100%; padding: 10px; border: none; border-radius: 4px; background-color: #ffa62d; color: white; font-size: 16px; cursor: pointer; box-sizing: border-box;">Envoyer</button>
        </form>
      `,
      '4p': `
        <h3 style="text-align: center; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">Les emails c'est fun JUJU.</h3>
        <form method="POST" action="https://organisologie55050.activehosted.com/proc.php" class="subscribe-form" novalidate style="width: 100%; padding: 20px; border-radius: 4px; font-family: Arial, sans-serif; box-sizing: border-box;">
          <input type="hidden" name="u" value="1" />
          <input type="hidden" name="f" value="1" />
          <input type="hidden" name="s" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
        
          <input type="email" class="email-input" name="email" placeholder="Saisissez votre e-mail" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
          <div class="error-message" style="color: red; display: none;">Veuillez saisir une adresse e-mail valide.</div>
        
          <button class="submit-button" type="submit" style="width: 100%; padding: 10px; border: none; border-radius: 4px; background-color: #ffa62d; color: white; font-size: 16px; cursor: pointer; box-sizing: border-box;">Envoyer</button>
        </form>
      `,
      // Add more forms as needed...
    }
  };