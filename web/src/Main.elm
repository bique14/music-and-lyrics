port module Main exposing (main)

import Array
import Browser
import Html exposing (..)
import Html.Attributes exposing (autoplay, class, controls, id, src, style)
import Html.Events exposing (onClick)



-- ports


port playAudio : () -> Cmd msg



-- subscriptions


port recievedLyrics : (String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    recievedLyrics ReceivedLyrics



-- Model


type alias Model =
    { audioSrc : String
    , lyric : List String
    }


type Msg
    = ReceivedLyrics String


initialModel : Model
initialModel =
    { audioSrc = "../media/location-unknown/audio.mp3"
    , lyric = []
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initialModel, playAudio () )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ReceivedLyrics str ->
            let
                { lyric } =
                    model

                str_ =
                    Array.fromList lyric
                        |> Array.push str
                        |> Array.toList
            in
            ( { model | lyric = str_ }, Cmd.none )


view : Model -> Html Msg
view model =
    div [ class "flex flex-col h-full justify-between" ]
        [ viewLyric model
        , viewAudio model
        ]


viewAudio : Model -> Html Msg
viewAudio { audioSrc } =
    audio
        [ id "audio-sound"
        , class "w-full"
        , style "background" "#f1f3f4"
        , style "filter" "contrast(75%) invert(100%)"
        , src audioSrc
        , controls True
        ]
        []


viewLyric : Model -> Html Msg
viewLyric { lyric } =
    div
        [ id "lyric-container"
        , class "overflow-scroll bg-green-700 h-full text-2xl"
        ]
        -- <|
        --     List.map
        --         (\l ->
        --             span [ class "block text-6xl" ] [ text l ]
        --         )
        --         lyric
        []


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
