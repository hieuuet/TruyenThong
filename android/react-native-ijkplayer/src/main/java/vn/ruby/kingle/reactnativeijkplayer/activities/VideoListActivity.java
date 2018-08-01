package vn.ruby.kingle.reactnativeijkplayer.activities;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Html;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.ArrayList;

import tv.danmaku.ijk.media.player.IjkMediaPlayer;
import vn.ruby.kingle.reactnativeijkplayer.R;
import vn.ruby.kingle.reactnativeijkplayer.common.Utils;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;
import vn.ruby.kingle.reactnativeijkplayer.fragments.ScreenSlide2PageFragment;
import vn.ruby.kingle.reactnativeijkplayer.fragments.ScreenSlidePageFragment;

public class VideoListActivity extends AppCompatActivity {
    private static final String TAG = "VideoListActivity";

    /**
     * The number of pages (wizard steps) to show in this demo.
     */
    private static final int NUM_PAGES = 5;

    /**
     * The pager widget, which handles animation and allows swiping horizontally to access previous
     * and next wizard steps.
     */
    private ViewPager mPager;
    private LinearLayout dotsLayout;
    private TextView[] dots;

    private ScreenSlidePagerAdapter myViewPagerAdapter;

    /**
     * The pager adapter, which provides the pages to the view pager widget.
     */
    private PagerAdapter mPagerAdapter;


    private ImageView split_1;
    private ImageView split_4;

    private ArrayList<CameraInfo> cameraList;

    private int numPage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_list);

        // init UI
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // add back arrow to toolbar
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDisplayShowHomeEnabled(true);
        }

        // Instantiate a ViewPager and a PagerAdapter.
        mPager = (ViewPager) findViewById(R.id.pager);
        dotsLayout = (LinearLayout) findViewById(R.id.layoutDots);

        split_1 = (ImageView) findViewById(R.id.split_1);
        split_4 = (ImageView) findViewById(R.id.split_4);
        split_1.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                numPage = cameraList.size();
                addBottomDots(0);
                mPagerAdapter = new ScreenSlidePagerAdapter(getSupportFragmentManager());
                mPager.setAdapter(mPagerAdapter);
                mPager.addOnPageChangeListener(viewPagerPageChangeListener);
                mPager.setOffscreenPageLimit(1);
            }
        });

        split_4.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                if(cameraList.size() % 4 == 0) numPage = cameraList.size() / 4;
                else numPage = cameraList.size() / 4 + 1;
                addBottomDots(0);
                mPagerAdapter = new ScreenSlide2PagerAdapter(getSupportFragmentManager());
                mPager.setAdapter(mPagerAdapter);
                mPager.addOnPageChangeListener(viewPagerPageChangeListener);
                mPager.setOffscreenPageLimit(1);


            }
        });

        prepareCameras();
        // adding bottom dots
        numPage = cameraList.size();
        addBottomDots(0);

        mPagerAdapter = new ScreenSlidePagerAdapter(getSupportFragmentManager());
        mPager.setAdapter(mPagerAdapter);
        mPager.addOnPageChangeListener(viewPagerPageChangeListener);
        mPager.setOffscreenPageLimit(1);


        int w = Utils.calculateSizeWidth(this, 1);
        int h = Utils.calculateSizeHeight(this, 1);
        Log.d("WIDTH: ",  w + "");
        Log.d("HEIGHT: ",  h + "");
    }

    //  viewpager change listener
    ViewPager.OnPageChangeListener viewPagerPageChangeListener = new ViewPager.OnPageChangeListener() {

        @Override
        public void onPageSelected(int position) {
            addBottomDots(position);
        }

        @Override
        public void onPageScrolled(int arg0, float arg1, int arg2) {

        }

        @Override
        public void onPageScrollStateChanged(int arg0) {

        }
    };



    private void addBottomDots(int currentPage) {
        dots = new TextView[numPage];

        int[] colorsActive = getResources().getIntArray(R.array.array_dot_active);
        int[] colorsInactive = getResources().getIntArray(R.array.array_dot_inactive);

        dotsLayout.removeAllViews();
        for (int i = 0; i < dots.length; i++) {
            dots[i] = new TextView(this);
            dots[i].setText(Html.fromHtml("&#8226;"));
            dots[i].setTextSize(35);
            dots[i].setTextColor(getResources().getColor(R.color.dot_light_screen1));
            dotsLayout.addView(dots[i]);
        }

        if (dots.length > 0)
            dots[currentPage].setTextColor(getResources().getColor(R.color.dot_dark_screen1));
    }

    @Override
    public void onBackPressed() {
        if (mPager.getCurrentItem() == 0) {
            // If the user is currently looking at the first step, allow the system to handle the
            // Back button. This calls finish() on this activity and pops the back stack.
            super.onBackPressed();
        } else {
            // Otherwise, select the previous step.
            mPager.setCurrentItem(mPager.getCurrentItem() - 1);
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (item.getItemId() == android.R.id.home) {

            finish(); // close this activity and return to preview activity (if there is any)
        }

        return super.onOptionsItemSelected(item);
    }

    /**
     * A simple pager adapter that represents 5 ScreenSlidePageFragment objects, in
     * sequence.
     */
    private class ScreenSlidePagerAdapter extends FragmentStatePagerAdapter {
        public ScreenSlidePagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return ScreenSlidePageFragment.newInstance(cameraList, position);
        }

        @Override
        public int getCount() {
            return cameraList.size() / 1;
        }

    }

    private class ScreenSlide2PagerAdapter extends FragmentStatePagerAdapter {
        public ScreenSlide2PagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return ScreenSlide2PageFragment.newInstance(cameraList, position);
        }

        @Override
        public int getCount() {
            if(cameraList.size() % 4 == 0) return cameraList.size() / 4;
            else return cameraList.size() / 4 + 1;
        }

    }

    private void prepareCameras() {
//        cameraList = new ArrayList<CameraInfo>();
//        CameraInfo camInfo = new CameraInfo("rtsp://admin:123_hikvision@14.160.75.86:2251/Streaming/Channels/301", "Camera cửa 1");
//
//        cameraList.add(camInfo);
//        camInfo = new CameraInfo("rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov", "Camera cửa 2");
//
//        cameraList.add(camInfo);
//        camInfo = new CameraInfo("rtsp://admin:123_hikvision@14.160.75.86:2251/Streaming/Channels/301", "Camera cửa 3");
//
//        cameraList.add(camInfo);
//        camInfo = new CameraInfo("rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov", "Camera cửa 4");
//
//        cameraList.add(camInfo);
//        camInfo = new CameraInfo("rtsp://admin:123_hikvision@14.160.75.86:2251/Streaming/Channels/301", "Camera cửa 5");
//
//        cameraList.add(camInfo);
    }

}
