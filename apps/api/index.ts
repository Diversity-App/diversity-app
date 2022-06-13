import app from './src/app';
import configuration from './configuration';

app.listen(configuration.PORT, () => {
    console.log('Listening on port 8080');
});
