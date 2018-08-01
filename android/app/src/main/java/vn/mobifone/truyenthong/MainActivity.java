package vn.mobifone.truyenthong;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.splashScreenTheme);
        super.onCreate(savedInstanceState);

    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TruyenThong";
    }

    /*@Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                Intent mainIntent = getIntent();
                String dataValue = "";
                Bundle initialProps = new Bundle();
                if (mainIntent != null) {
                    Bundle bundle = mainIntent.getExtras();

                    if (bundle != null) {
                        JSONObject data = getPushData(bundle.getString("data"));
                        if (data != null) {
                            try {
                                dataValue = data.toString();
                            } catch (Exception e) {
                                // no-op
                            }
                        } else {
                        }
                    }
                }
                Log.d("-----MainActivity-----", dataValue);
                initialProps.putString("pushData", dataValue); // Read this inside your Root component in React native
                return initialProps;
            }
        };
    }

    private JSONObject getPushData(String dataString) {
        try {
            return new JSONObject(dataString);
        } catch (Exception e) {
            return null;
        }
    }*/
}
