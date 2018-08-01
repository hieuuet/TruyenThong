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
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

import vn.ruby.kingle.reactnativeijkplayer.R;
import vn.ruby.kingle.reactnativeijkplayer.common.OnSwipeTouchListener;
import vn.ruby.kingle.reactnativeijkplayer.common.Utils;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;
import vn.ruby.kingle.reactnativeijkplayer.fragments.ScreenSlide2PageFragment;
import vn.ruby.kingle.reactnativeijkplayer.fragments.ScreenSlidePageFragment;
import vn.ruby.kingle.reactnativeijkplayer.widget.CameraMultiView;

public class VideoList2Activity extends AppCompatActivity {
    private static final String TAG = "VideoList2Activity";

    private TextView[] dots;
    private ImageView split_1;
    private ImageView split_4;

    private ArrayList<CameraInfo> cameraList;
    private int numPage;
    private LinearLayout dotsLayout;

    private CameraMultiView cameraMultiView;

    private int index;
    private int numCol;

    private TextView tv_title;
    private ImageButton img_back;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_list_2);

        // init UI
       /* Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // add back arrow to toolbar
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setDisplayShowHomeEnabled(true);
        }*/

        this.tv_title = (TextView) findViewById(R.id.tv_title);
        this.img_back = (ImageButton) findViewById(R.id.img_back);

        this.tv_title.setText(R.string.list_camera);
        this.img_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                cameraMultiView.stop();
                finish(); // close this activity and return to preview activity (if there is any)
            }
        });

        if(getIntent().getSerializableExtra("cameraList") != null) {
            cameraList = (ArrayList<CameraInfo>) getIntent().getSerializableExtra("cameraList");
        }

        dotsLayout = (LinearLayout) findViewById(R.id.layoutDots);
        split_1 = (ImageView) findViewById(R.id.split_1);
        split_4 = (ImageView) findViewById(R.id.split_4);

        cameraMultiView = (CameraMultiView) findViewById(R.id.cameraViewer);

        split_1.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                index = 0;
                numCol = 1;
                numPage = cameraList.size();
                addBottomDots(0);
                cameraMultiView.stop();
                cameraMultiView.play(cameraList, numCol, index, true);

            }
        });

        split_4.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                index = 0;
                numCol = 2;
                if(cameraList.size() % 4 == 0) numPage = cameraList.size() / 4;
                else numPage = cameraList.size() / 4 + 1;
                addBottomDots(0);
                cameraMultiView.stop();
                cameraMultiView.play(cameraList, numCol, index, true);


            }
        });

//        prepareCameras();

        numCol = 1;
        index = 0;
        cameraMultiView.play(cameraList, numCol, index, true);

        cameraMultiView.setOnTouchListener(new OnSwipeTouchListener(VideoList2Activity.this) {
            public void onSwipeTop() {
            }
            public void onSwipeRight() {
//                Toast.makeText(VideoList2Activity.this, "right", Toast.LENGTH_SHORT).show();
                if(index > 0) {
                    --index;
                    addBottomDots(index);
                    cameraMultiView.stop();
                    cameraMultiView.play(cameraList, numCol, index, true);
                }
            }
            public void onSwipeLeft() {
//                Toast.makeText(VideoList2Activity.this, "left", Toast.LENGTH_SHORT).show();
                if(index < cameraList.size() - 1) {
                    ++index;
                    addBottomDots(index);
                    cameraMultiView.stop();
                    cameraMultiView.play(cameraList, numCol, index, true);
                }
            }
            public void onSwipeBottom() {
            }

        });

        // adding bottom dots
        numPage = cameraList.size();
        addBottomDots(0);

    }




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
    public boolean onCreateOptionsMenu(Menu menu) {
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (item.getItemId() == android.R.id.home) {
            cameraMultiView.stop();
            finish(); // close this activity and return to preview activity (if there is any)
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Log.d("VideoList2  Back", "Back hardware click");
        cameraMultiView.stop();
        finish();
    }
}
