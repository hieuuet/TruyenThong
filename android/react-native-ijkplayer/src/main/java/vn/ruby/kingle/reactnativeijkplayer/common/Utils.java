package vn.ruby.kingle.reactnativeijkplayer.common;

import android.app.Activity;
import android.util.DisplayMetrics;
import android.util.Log;

/**
 * Created by vuong.lequoc on 22/03/2018.
 */

public class Utils {

    public static int calculateSizeWidth(Activity ac, int column) {
        DisplayMetrics dMetrics = new DisplayMetrics();
        ac.getWindowManager().getDefaultDisplay().getMetrics(dMetrics);
        float density = dMetrics.density;
        int w = Math.round(dMetrics.widthPixels);
        int h = Math.round(dMetrics.heightPixels );
        Log.d("Width screen", w + "");
        Log.d("Height screen", h + "");
        int width = Math.round((w - (Constants.PADDING * (column + 1))) / column);
        return width;
    }

    public static int calculateSizeHeight(Activity ac, int column) {
        DisplayMetrics dMetrics = new DisplayMetrics();
        ac.getWindowManager().getDefaultDisplay().getMetrics(dMetrics);
        float density = dMetrics.density;
        int w = Math.round(dMetrics.widthPixels );
        int h = Math.round(dMetrics.heightPixels );
        int width = Math.round((w - (Constants.PADDING * (column + 1))) / column);
        int height = Math.round(width * Constants.RATIO);
        return height;
    }

    public static int getWidth(Activity ac) {
        DisplayMetrics dMetrics = new DisplayMetrics();
        ac.getWindowManager().getDefaultDisplay().getMetrics(dMetrics);
        float density = dMetrics.density;
        int w = Math.round(dMetrics.widthPixels);
        int h = Math.round(dMetrics.heightPixels );
        return w;
    }

    public static int getHeight(Activity ac) {
        DisplayMetrics dMetrics = new DisplayMetrics();
        ac.getWindowManager().getDefaultDisplay().getMetrics(dMetrics);
        float density = dMetrics.density;
        int w = Math.round(dMetrics.widthPixels );
        int h = Math.round(dMetrics.heightPixels );
        return h;
    }
}
