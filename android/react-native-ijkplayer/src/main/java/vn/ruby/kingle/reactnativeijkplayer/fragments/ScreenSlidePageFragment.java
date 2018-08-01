package vn.ruby.kingle.reactnativeijkplayer.fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import java.util.ArrayList;

import co.ceryle.fitgridview.FitGridView;
import vn.ruby.kingle.reactnativeijkplayer.R;
import vn.ruby.kingle.reactnativeijkplayer.adapter.ItemAdapter;
import vn.ruby.kingle.reactnativeijkplayer.entry.CameraInfo;
import vn.ruby.kingle.reactnativeijkplayer.widget.media.IjkVideoView2;

/**
 * Created by vuong.lequoc on 20/03/2018.
 */

public class ScreenSlidePageFragment extends Fragment {


    // customize list camera
    private FitGridView gridView;
    private ItemAdapter adapter;
    private ArrayList<CameraInfo> camList;
    private int pageIndex;

    private ListView listViewCam;


    // newInstance constructor for creating fragment with arguments
    public static ScreenSlidePageFragment newInstance(ArrayList<CameraInfo> cameraList, int pageIndex) {
        ScreenSlidePageFragment fragmentFirst = new ScreenSlidePageFragment();
        Bundle args = new Bundle();
        args.putSerializable("cameraList", cameraList);
        args.putInt("pageIndex", pageIndex);
        fragmentFirst.setArguments(args);
        return fragmentFirst;
    }

    // Store instance variables based on arguments passed
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ArrayList<CameraInfo> cameraList = (ArrayList<CameraInfo>) getArguments().getSerializable("cameraList");

        pageIndex  = getArguments().getInt("pageIndex");
        camList = new ArrayList<CameraInfo>();
        for(int i = pageIndex; i < cameraList.size(); ++i) {
            camList.add(cameraList.get(i));
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(
                R.layout.fragment_screen_slide_page, container, false);

        gridView = (FitGridView) rootView.findViewById(R.id.gridView);

        adapter = new ItemAdapter(getActivity(), camList, 1);

        gridView.setFitGridAdapter(adapter);
        changeSize(1, 1);

        return rootView;
    }


    private void changeSize(int r, int c) {
        gridView.setNumRows(r);
        gridView.setNumColumns(c);
        gridView.update();
    }

    @Override
    public void onResume() {
        Log.d("onResume Fragment", "onResume ScreenSlide1");
        super.onResume();
    }

    @Override
    public void onStop() {
        Log.d("onStop Fragment", "onStop ScreenSlide1");
        super.onStop();
    }

    @Override
    public void onDestroyView() {
        Log.d("onDestroyView Fragment", "onDestroyView ScreenSlide1");
        super.onDestroyView();
    }

    @Override
    public void onDestroy() {
        Log.d("onDestroy Fragment", "onDestroy ScreenSlide1");
        super.onDestroy();
    }

    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        if (isVisibleToUser) {

        } else {
        }
    }


}
